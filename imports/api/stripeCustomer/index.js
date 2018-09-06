import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace StripeCustomer
 * @summary defines utilities related to Stripe Customer.
 */
const StripeCustomer = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import collection from "./server/collection";
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(StripeCustomer, { collection, types, resolvers, service });
}

export default StripeCustomer;

