import { Meteor } from "meteor/meteor";
import extend from "lodash/extend";

/**
 * @namespace Achievements
 * @summary defines utilities related to Achievements.
 */
const Achievements = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
import collection from "./server/collection";
import types from "./server/types.graphql";
import resolvers from "./server/resolvers";
import service from "./server/service";

    extend(Achievements, { collection, types, resolvers, service });
}

export default Achievements;

