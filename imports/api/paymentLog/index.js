import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace PaymentLog
 * @summary defines utilities related to PaymentLog.
 */
const PaymentLog = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import collection from "./server/collection";
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(PaymentLog, { collection, types, resolvers, service });
}

export default PaymentLog;

