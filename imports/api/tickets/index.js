import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Tickets
 * @summary defines utilities related to Tickets.
 */
const Tickets = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import collection from "./server/collection";
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(Tickets, { collection, types, resolvers, service });
}

export default Tickets;

