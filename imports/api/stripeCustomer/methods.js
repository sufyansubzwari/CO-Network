/* eslint-disable consistent-return */

import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import StripeCustomer from "./collection";
import handleMethodException from "../handle-method-exception";
import rateLimit from "../rate-limit";

let secret = Meteor.settings.stripe.secretKey;
let Stripe = StripeAPI(secret);

Meteor.methods({
  "stripeCustomer.findOne": function findOne(owner) {
    check(owner, Match.OneOf(String, undefined));

    try {
      return StripeCustomer.findOne({owner: owner});
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  "stripeCustomer.insert": function customerInsert(stripeToken, owner, type) {
    check(stripeToken, Match.Any);
    check(owner, String);
    check(type, String);
    try {
      return Stripe.customers
        .create({
          source: stripeToken.id,
          email: stripeToken.email
        })
        .then(async customer => {
          console.log("customer created:", customer);
          return StripeCustomer.insert({
            stripeToken,
            owner,
            customer: customer.id,
            type
          });
        })
        .catch(exception => {
          handleMethodException(exception);
        });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  "stripeCustomer.update": function eventsUpdate(doc) {
    check(doc, {
      _id: String,
      owner: String,
      customer: String,
      stripeToken: Match.Any,
      type: String,
    });

    try {
      const itemId = doc._id;
      const customer = StripeCustomer.findOne(itemId, { fields: { owner: 1 } });

      if (customer.owner === this.userId) {
        StripeCustomer.update(itemId, { $set: doc });
        return itemId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error(
        "403",
        "Sorry. You're not allowed to edit this event."
      );
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  "stripeCustomer.remove": function eventsRemove(itemId) {
    check(itemId, String);

    try {
      const docToRemove = StripeCustomer.findOne(itemId);

      if (docToRemove.owner === this.userId) {
        return Stripe.customers
          .del(docToRemove.customer)
          .then(async customer => {
            console.log("customer deleted:", customer);
            return StripeCustomer.remove(itemId);
          })
          .catch(exception => {
            handleMethodException(exception);
          });

      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: [
    "stripeCustomer.insert",
    "stripeCustomer.update",
    "stripeCustomer.remove"
  ],
  limit: 5,
  timeRange: 1000
});
