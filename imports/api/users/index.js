import { Meteor } from 'meteor/meteor';
import extend from 'lodash/extend';

/**
 * @namespace Users
 * @summary defines utilities related to User entities.
 */
const User = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection';
  import types from './server/types.graphql';
  import resolvers from './server/resolvers';
  import utils from './server/utils';
  import service from './server/service';

  extend(User, { collection, types, resolvers, utils, service });
}

export default User;
