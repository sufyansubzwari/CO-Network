/* eslint-disable consistent-return */

import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Tickets from "../tickets/server/collection";
import TicketsSold from "./collection";
import handleMethodException from "../handle-method-exception";
import rateLimit from "../rate-limit";
import v1 from "uuid/v1";

let secret = Meteor.settings.stripe.secretKey;
let Stripe = StripeAPI(secret);

Meteor.methods({
  "tickets.buy": async function eventsFindOne(stripeToken, userId, tickets) {
    check(stripeToken, Match.Any);
    check(userId, String);
    check(tickets, Array);

    try {
      const buyId = v1();
      //Get tickets to buy
      let amount = 0;
      tickets.length > 0 &&
        tickets.forEach(tic => {
          const ticket = Tickets.findOne({ _id: tic.ticketId });
          if (ticket.price) amount += tic.quantity * ticket.price;
        });
      let charge = async stripeToken => {
        return await Stripe.charges.create({
          amount: amount * 100,
          currency: "usd",
          source: stripeToken.id,
          description: `Charge for ${stripeToken.email}`
        });
      };
      let chargeResult = await charge(stripeToken);
      tickets.length > 0 &&
        tickets.forEach(async tic => {
          const ticket = Tickets.findOne({ _id: tic.ticketId });
          if (ticket) {
            TicketsSold.insert({
              ticketId: tic.ticketId,
              event: ticket.owner,
              userId,
              buyId: buyId,
              quantity: tic.quantity,
              client_ip: stripeToken.client_ip,
              email: stripeToken.email,
              cardInfo: stripeToken.card,
              chargeInfo: chargeResult
            });
            Tickets.update(
              { _id: tic.ticketId },
              {
                $inc: { available: -tic.quantity }
              }
            );
          }
        });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: ["tickets.buy"],
  limit: 5,
  timeRange: 1000
});
