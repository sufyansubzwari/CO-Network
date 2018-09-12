import { Meteor } from "meteor/meteor";
import getUserName from "./get-user-name";
import * as types from "./types";

export function onLogin() {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  // const loading = !Roles.subscription.ready();
  const name =
    user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return dispatch => {
    dispatch({
      type: types.ON_LOGIN,
      loading,
      loggingIn,
      authenticated: !loggingIn && !!userId,
      name: name || emailAddress,
      // roles: !loading && Roles.getRolesForUser(userId),
      userId,
      emailAddress,
      emailVerified:
        user && user.emails
          ? user && user.emails && user.emails[0].verified
          : true
    });
  };
}

export function onLogout() {
  return {
    type: types.ON_LOGOUT,
    loading: false,
    loggingIn: false,
    authenticated: false,
    name: "",
    roles: [],
    userId: null,
    emailAddress: "",
    emailVerified: false
  };
}
