import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Requirement
 * @summary defines utilities related to Requirement entities.
 */
const Requirement = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from "./server/collection";
  import types from "./server/types.graphql";
  import resolvers from "./server/resolvers";

  extend(Requirement, { collection, types, resolvers });
}

export default Requirement;
