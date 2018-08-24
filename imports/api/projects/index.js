import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Projects
 * @summary defines utilities related to User entities.
 */
const Projects = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from "./server/collection";
  import types from "./server/types.graphql";
  import resolvers from "./server/resolvers";

  extend(Projects, { collection, types, resolvers, utils });
}

export default Projects;
