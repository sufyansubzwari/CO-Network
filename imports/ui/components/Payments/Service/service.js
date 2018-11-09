import { Meteor } from "meteor/meteor";

const findByOwnerAndType = (id, type, callBack) => {
  Meteor.call("payment.findByOwnerAndType", id, type, (error, result) => {
    callBack(error, result);
  });
};

const paySubscriptions = (payload, type, callBack) => {
  if (!payload.token) {
    callBack && callBack(payload);
    return; //Todo: noficication of error
  }
  Meteor.call(
    "payment.paySubscriptions",
    payload.token.id,
    type,
    (error, result) => {
      if (error) {
        console.log(error);
        //Todo: noficication of error
      }
      callBack && callBack(error, result);
    }
  );
};

export { findByOwnerAndType, paySubscriptions };
