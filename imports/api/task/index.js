import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Task
 * @summary defines utilities related to Task entities.
 */
const Task = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from "./server/collection";
  import types from "./server/types.graphql";
  import resolvers from "./server/resolvers";

  extend(Task, { collection, types, resolvers });
}

export default Task;
