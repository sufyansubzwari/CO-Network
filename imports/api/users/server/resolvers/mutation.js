import {Meteor} from "meteor/meteor";
import webPush from "web-push";
import map from "lodash/map";
import flatten from "lodash/flatten";
import {Accounts} from "meteor/accounts-base";
import {GraphQLError} from "graphql";
import collection from "../collection";
import utils from "../utils";
import Service from "../service";
import Tags from "../../../tags";
import Places from "../../../places";
import Achievement from "../../../archivements/server/service";

const {privateKey: gcmPrivateKey} = Meteor.settings.firebase;
const {publicKey: vapidPublicKey} = Meteor.settings.public.vapid;
const {
  subject: vapidSubject,
  privateKey: vapidPrivateKey
} = Meteor.settings.vapid;

// Wrap collection and utils around namespace for clarity
const Users = {collection, utils};

// Users namespace mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
/**
 * @summary Send email account verification email to current logged in user.
 */
Mutation.sendVerificationEmail = (root, args, context) => {
  console.log("About to send verification email...");
  const {userId} = context;

  Users.utils.checkLoggedInAndNotVerified(userId);

  try {
    Accounts.sendVerificationEmail(userId);
    console.log("Verification email sent!");
    return {_id: userId};
  } catch (exc) {
    throw new GraphQLError(
      `Verification email couldn't be delivered. Reason: ${exc.response}`
    );
  }
};
//------------------------------------------------------------------------------
/**
 * @summary Save subscription into user's record.
 */
Mutation.saveSubscription = (root, args, context) => {
  const {subscription} = args;
  const {userId} = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = {_id: userId};
  const modifier = {$addToSet: {subscriptions: subscription}};
  Users.collection.update(selector, modifier);

  return {_id: userId};
};
//------------------------------------------------------------------------------
/**
 * @summary Remove subscription from user's record.
 */
Mutation.deleteSubscription = (root, args, context) => {
  const {endpoint} = args;
  const {userId} = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = {_id: userId};
  const modifier = {$pull: {subscriptions: {endpoint}}};
  Users.collection.update(selector, modifier);

  return {_id: userId};
};
//------------------------------------------------------------------------------
/**
 * @summary Send push notification to all subscribed users.
 */
Mutation.sendPushNotification = (root, args, context) => {
  const {userId} = context;

  Users.utils.checkLoggedInAndVerified(userId);

  // Set web-push keys
  webPush.setGCMAPIKey(gcmPrivateKey);
  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const payload = JSON.stringify({
    title: "Welcome",
    body: "Thank you for enabling push notifications",
    icon: "/android-chrome-192x192.png"
  });

  const options = {
    TTL: 60 // time to live in seconds
  };

  // Gather all subscriptions from all subscribed users
  const selector = {subscriptions: {$exists: true, $ne: []}};
  const projection = {fields: {_id: true, subscriptions: true}};
  const users = Users.collection.find(selector, projection).fetch();
  const subscriptions = flatten(map(users, "subscriptions"));

  // Actually send the messages
  subscriptions.forEach(subscription => {
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => {
      })
      .catch(err => {
        console.log(
          `Error when trying to deliver message for ${subscription.endpoint}`,
          err
        );
        // This is probably an old subscription, remove it
        Mutation.deleteSubscription(
          null,
          {endpoint: subscription.endpoint},
          {userId}
        );
      });
  });
};
//------------------------------------------------------------------------------
Mutation.user = async (root, {user}, context) => {
  let profile = Object.assign({}, user.profile);
  let oldUser = user._id ? Service.getUser(user._id) : null;
  /****** Updating tags in database ******/
  console.log(profile.knowledge.languages)
  if (profile.knowledge && profile.knowledge.languages)
    profile.knowledge.languages = await Tags.service.normalizeTagsWithLevels(profile.knowledge.languages, oldUser && oldUser.profile && oldUser.profile.knowledge && oldUser.profile.knowledge.languages  ? oldUser.profile.knowledge.languages : []);
  if (profile.knowledge && profile.knowledge.curiosity)
    profile.knowledge.curiosity = await Tags.service.normalizeTagsWithLevels(profile.knowledge.curiosity, oldUser.profile && oldUser.profile.knowledge && oldUser.profile.knowledge.curiosity ? oldUser.profile.knowledge.curiosity : []);
  if (profile.professional && profile.professional.industry)
    profile.professional.industry = await Tags.service.normalizeTags(profile.professional.industry, oldUser.profile && oldUser.profile.professional && oldUser.profile.professional.industry ? oldUser.profile.professional.industry : []);
  if (profile.speaker && profile.speaker.otherpreferred)
    profile.speaker.otherpreferred = await Tags.service.normalizeTags(profile.speaker.otherpreferred, oldUser.profile && oldUser.profile.speaker && oldUser.profile.speaker.otherpreferred ? oldUser.profile.speaker.otherpreferred : []);
  if (profile.speaker && profile.speaker.otherlooking)
    profile.speaker.otherlooking = await Tags.service.normalizeTags(profile.speaker.otherlooking, oldUser.profile && oldUser.profile.speaker && oldUser.profile.speaker.otherlooking ? oldUser.profile.speaker.otherlooking : []);
  if (profile.speaker && profile.speaker.topic)
    profile.speaker.topic = await Tags.service.normalizeTags(profile.speaker.topic, oldUser.profile && oldUser.profile.speaker && oldUser.profile.speaker.topic ? oldUser.profile.speaker.topic : []);

  user.profile = Object.assign(user.profile, profile);
  const achievementsList = Object.assign([], profile.achievements);
  const placesList = Object.assign({}, profile.place);
  const inserted = await Service.user(user);
  //inserting location
  if (placesList && placesList.location && placesList.location.address) {
    let place = Object.assign({}, placesList);
    if (!place._id) {
      place.owner = inserted._id;
      place.entity = "USER";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }
  const f = await Achievement.deleteAchievement({owner: inserted._id});
    console.log("deleted ------", f);
    if (achievementsList && achievementsList.length > 0) {
    achievementsList.forEach(async ach => {
        if (ach._id) {
          delete ach._id
      }
        ach.owner = inserted._id;
        await Achievement.achievement(ach);
    });
  }

  return inserted;
};
//------------------------------------------------------------------------------
Mutation.deleteUser = (root, {_id}, context) => {
  return Service.deleteUser(_id);
};

Mutation.updateSignUpStatus = (root, {_id, status}, context) => {
  return Service.signUpUser(_id, status);
};

Mutation.updateIdentities = (root, {_id, identities}, context) => {
  return Service.updateIdentities(_id, identities);
};

export default Mutation;
