import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
Meteor.methods({
  "users.insertUserAuth0": function insertUserAuth0(profile, services) {
    // todo integrate with the new grapql api
    check(profile, Object);
    check(services, String);
    let user = Accounts.updateOrCreateUserFromExternalService(
      services,
      { id: profile.user_id },
      {
        email: profile.email,
        profile: { auth0: services, ...profile }
      }
    );
    let stampedLoginToken = Accounts._generateStampedLoginToken();
    console.log("_insertLoginToken", user);
    Accounts._insertLoginToken(user.userId, stampedLoginToken);
    return stampedLoginToken;
  },
  "users.findUser": function(user_id) {
    // todo integrate with the new grapql api
    check(user_id, String);
    return Meteor.users.find({ "profile.user_id": user_id }).fetch();
  }
});
