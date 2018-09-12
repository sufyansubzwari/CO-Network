import { Accounts } from "meteor/accounts-base";
import getOAuthProfile from "./get-oauth-profile";
import { Roles } from "meteor/alanning:roles";

//------------------------------------------------------------------------------
Accounts.onCreateUser((options, user) => {
  console.log("\nsign up attempt:", new Date());
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  const OAuthProfile = options.profile
    ? getOAuthProfile(options.profile, userToCreate)
    : false;
  if (OAuthProfile) {
    userToCreate.profile.personalInfo = OAuthProfile.personalInfo;
    userToCreate.profile.aboutMe = OAuthProfile.aboutMe;
    userToCreate.profile.name = OAuthProfile.name;
    // todo: check if we need send a notification email
    // sendWelcomeEmail(userToCreate);
  } else {
    // Throw in case of a different service
    throw new Error(
      401,
      "Sign up attempt with service different than we provided"
    );
  }
  userToCreate.roles = ["normal"]; // Set default roles for new sign ups.
  return Object.assign({}, userToCreate);
});
