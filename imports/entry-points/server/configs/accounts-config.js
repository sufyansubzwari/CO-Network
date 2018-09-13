import { Accounts } from "meteor/accounts-base";
import getOAuthProfile from "./get-oauth-profile";

//------------------------------------------------------------------------------
Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  const OAuthProfile = options.profile
    ? getOAuthProfile(options.profile, userToCreate)
    : false;
  if (OAuthProfile) {
    userToCreate.createdAt = OAuthProfile.createdAt;
    userToCreate.profile.info = OAuthProfile.info;
    userToCreate.profile.aboutMe = OAuthProfile.aboutMe;
    userToCreate.name = OAuthProfile.name;
    // todo: check if we need send a notification email
    // sendWelcomeEmail(userToCreate);
  }
  userToCreate.roles = ["normal"]; // Set default roles for new sign ups.
  console.log({ ...userToCreate })
  return { ...userToCreate };
});
