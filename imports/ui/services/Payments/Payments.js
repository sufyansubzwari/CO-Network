import { Meteor } from "meteor/meteor";
import { NotificationToast } from "../../services";

const findByOwnerAndType = (id, type, callBack) => {
  Meteor.call("payment.findByOwnerAndType", id, type, (error, result) => {
    callBack(error, result);
  });
};

const paySubscriptions = (payload, type, callBack) => {
  if (!payload.token) {
    NotificationToast.error(
      payload.error && payload.error.message
        ? payload.error.message
        : "Stripe Error",
      "Stripe Error"
    );
    callBack && callBack(payload);
  }
  Meteor.call(
    "payment.paySubscriptions",
    payload.token.id,
    type,
    (error, result) => {
      if (error) {
        // NotificationToast.error(error, "Stripe Error");
      }
      callBack && callBack(error, result);
    }
  );
};

const payTicket = (payload, user, tickets, callBack) => {
  if (!payload.token) {
    NotificationToast.error(
      payload.error && payload.error.message
        ? payload.error.message
        : "Stripe Error",
      "Stripe Error"
    );
    callBack && callBack(payload);
  }
  Meteor.call("tickets.buy", payload.token, user, tickets, (error, result) => {
    if (error) {
      console.log("Stripe Error: ", error);
      // NotificationToast.error(error, "Stripe Error");
    }
    callBack && callBack(error, result);
  });
};

const createCustomer = (payload, user, type, callBack) => {
  if (!payload.token) {
    NotificationToast.error(
      payload.error && payload.error.message
        ? payload.error.message
        : "Stripe Error",
      "Stripe Error"
    );
    callBack && callBack(payload);
  }
  Meteor.call(
    "stripeCustomer.insert",
    payload.token,
    user,
    type,
    (error, result) => {
      if (error) {
        console.log("Stripe Error: ", error);
        // NotificationToast.error(error, "Stripe Error");
      }
      callBack && callBack(error, result);
    }
  );
};

const deleteCustomer = (id, callBack) => {
  Meteor.call("stripeCustomer.remove", id, (error, result) => {
    if (error) {
      console.log("Stripe Error: ", error);
      // NotificationToast.error(error, "Stripe Error");
    }
    callBack && callBack(error, result);
  });
};

const findCustomer = (owner, callBack) => {
  Meteor.call("stripeCustomer.findByOwner", owner, (error, result) => {
    if (error) {
      console.log("Stripe Error: ", error);
      // NotificationToast.error(error, "Stripe Error");
    }
    callBack && callBack(error, result);
  });
};

export {
  findByOwnerAndType,
  paySubscriptions,
  createCustomer,
  deleteCustomer,
  payTicket,
  findCustomer
};
