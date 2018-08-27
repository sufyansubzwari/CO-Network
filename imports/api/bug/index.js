import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Bug
 * @summary defines utilities related to Bug entities.
 */
const Bug = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from "./server/collection";
  import types from "./server/types.graphql";
  import resolvers from "./server/resolvers";

  extend(Bug, { collection, types, resolvers });
}

export default Bug;
