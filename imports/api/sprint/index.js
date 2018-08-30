import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Sprint
 * @summary defines utilities related to Sprint entities.
 */
const Sprint = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from "./server/collection";
  import types from "./server/types.graphql";
  import resolvers from "./server/resolvers";
  import service from "./server/service";

  extend(Sprint, { collection, types, resolvers ,service});
}

export default Sprint;
