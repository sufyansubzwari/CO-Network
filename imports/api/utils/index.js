import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Utils
 * @summary defines utilities related to utils resources in the application.
 */
const Utils = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(Utils, {types, resolvers, service });
}

export default Utils;

