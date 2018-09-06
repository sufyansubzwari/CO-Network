import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Events
 * @summary defines utilities related to Events entities.
 */
const Events = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import collection from "./server/collection";
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(Events, { collection, types, resolvers, service });
}

export default Events;

