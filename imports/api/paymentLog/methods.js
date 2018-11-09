import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import PaymentLog from './collection';
import handleMethodException from "../handle-method-exception";
import rateLimit from "../rate-limit";
import moment from 'moment'
import Future from 'fibers/future';

let secret = Meteor.settings.stripe.secretKey;
let Stripe = StripeAPI(secret);
Meteor.methods({

  'payment.paySubscriptions': function paySubcription(token, type) {
    console.log("Token and type: ==>> ", token, type);
    check(token, Match.Maybe(String));
    check(type, Match.Maybe(String));
    let user = Meteor.user()
    let userId = Meteor.userId()
    let email = user.profile.email
    let amount = (type === "job") ? 50 : 100
    console.log("payment starting for ", userId, " user:", user.profile.name);
    let charge = async (customer) => {
      return await Stripe.charges.create({
        amount: amount * 100,
        currency: 'usd',
        customer: customer.id
      });
    }

    let response = new Future()
    try {
      Stripe.customers.create({
        source: token,
        email: email
      }).then(Meteor.bindEnvironment(async (customer) => {
        console.log("Customer created");
        console.log("Customer created for ", userId, " user:", user.profile.name);
        let future1 = new Future()
        Meteor.call('stripeCustomer.insert',
          {owner: userId, customer: customer.id}, (error, result) => {
            if (error === undefined) {
              console.log("stripeCustomer inserted for ", userId, " user:", user.profile.name);
              future1.return(result);
            }
            else {
              console.log("stripeCustomer Error for ", userId, " user:", user.profile.name);
              future1.return(error);
              throw new Meteor.Error('Error processing the payment');
            }
          })
        future1.wait()
        console.log("chargeResult  for ", userId, " user:", user.profile.name);
        let chargeResult = await charge(customer);
        if (chargeResult.status === 'succeeded') {
          console.log("chargeResult  succeeded for ", userId, " user:", user.profile.name);
          let future2 = new Future()
          let expirationDate = moment().add(2, 'M');
          console.log('Date', expirationDate, typeof expirationDate);
          Meteor.call('payment.insert', {
            owner: userId,
            concept: type,
            expirationDate: new Date(expirationDate)
          }, (error, result) => {
            if (error === undefined) {
              console.log("payment  Inserted ", userId, " user:", user.profile.name);
              response.return(true)
            }
            else {
              console.log("payment  error ", userId, " user:", user.profile.name, 'error', error);
              response.return(error);
              throw new Meteor.Error('Error processing the payment');
            }
            future2.return(true);
          })
          future2.wait()

          return future2.get()
        }
        else {
          console.log("chargeResult  error for ", userId, " user:", user.profile.name);
          throw new Meteor.Error('Error processing the charge');
        }


      })).catch(exception => {
        handleMethodException(exception);
      })
      response.wait()
      return response.get()
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'payment.findByOwnerAndType': function eventsInsert(owner, type) {
    check(owner, Match.Maybe(String));
    check(type, Match.Maybe(String));
    try {

      let payments = PaymentLog.find({owner: owner, concept: type}, {
        fields: {
          owner: 1,
          expirationDate: 1
        },
        limit: 1,
        sort: {expirationDate: -1}
      }).fetch();

      console.log('find payment 2');
      console.log('found payment 3', payments);
      if (!payments.length) return false;
      const payment = payments[0];
      let different = moment(payment.expirationDate).diff(new Date(), "days");
      let differentType = 'days';
      console.log('different days', different);
      if (different === 0) {
        different = moment(payment.expirationDate).diff(new Date(), "hours")
        console.log('different hours', different);
        differentType = 'hours';
      }
      return different > 0 ? `${different} ${different == 1 ? differentType.replace('s', '') : differentType}` : false;

    } catch (exception) {
      console.log(exception)
      handleMethodException(exception);
    }
  },
  'payment.findOne': function eventsFindOne(itemId) {
    check(itemId, Match.Maybe(String));

    try {
      return PaymentLog.findOne(itemId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'payment.insert': function eventsInsert(doc) {
    check(doc, {
      owner: String,
      concept: String,
      expirationDate: Date,

    });

    try {
      return PaymentLog.insert({...doc});
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'payment.update': function eventsUpdate(doc) {
    check(doc, {
      _id: String,
      owner: String,
      concept: String,
      expirationDate: Date,

    });

    try {
      const itemId = doc._id;
      const customer = PaymentLog.findOne(itemId, {fields: {owner: 1}});

      if (customer.owner === this.userId) {
        PaymentLog.update(itemId, {$set: doc});
        return itemId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry. You\'re not allowed to edit this event.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'payment.remove': function eventsRemove(itemId) {

  },
});

rateLimit({
  methods: [
    'payment.insert',
    'payment.update',
    'payment.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
