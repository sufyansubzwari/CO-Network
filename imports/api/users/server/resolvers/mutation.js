import { Meteor } from "meteor/meteor";
import webPush from "web-push";
import map from "lodash/map";
import flatten from "lodash/flatten";
import { Accounts } from "meteor/accounts-base";
import { GraphQLError } from "graphql";
import collection from "../collection";
import utils from "../utils";
import Service from "../service";
import Tags from "../../../tags";
import Places from "../../../places";
import Achievement from "../../../archivements";

const { privateKey: gcmPrivateKey } = Meteor.settings.firebase;
const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;
const {
  subject: vapidSubject,
  privateKey: vapidPrivateKey
} = Meteor.settings.vapid;

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

// Users namespace mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
/**
 * @summary Send email account verification email to current logged in user.
 */
Mutation.sendVerificationEmail = (root, args, context) => {
  console.log("About to send verification email...");
  const { userId } = context;

  Users.utils.checkLoggedInAndNotVerified(userId);

  try {
    Accounts.sendVerificationEmail(userId);
    console.log("Verification email sent!");
    return { _id: userId };
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
  const { subscription } = args;
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $addToSet: { subscriptions: subscription } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------
/**
 * @summary Remove subscription from user's record.
 */
Mutation.deleteSubscription = (root, args, context) => {
  const { endpoint } = args;
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $pull: { subscriptions: { endpoint } } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------
/**
 * @summary Send push notification to all subscribed users.
 */
Mutation.sendPushNotification = (root, args, context) => {
  const { userId } = context;

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
  const selector = { subscriptions: { $exists: true, $ne: [] } };
  const projection = { fields: { _id: true, subscriptions: true } };
  const users = Users.collection.find(selector, projection).fetch();
  const subscriptions = flatten(map(users, "subscriptions"));

  // Actually send the messages
  subscriptions.forEach(subscription => {
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => {})
      .catch(err => {
        console.log(
          `Error when trying to deliver message for ${subscription.endpoint}`,
          err
        );
        // This is probably an old subscription, remove it
        Mutation.deleteSubscription(
          null,
          { endpoint: subscription.endpoint },
          { userId }
        );
      });
  });
};
//------------------------------------------------------------------------------
Mutation.user = async (root, { user }, context) => {

  let profile = Object.assign({}, user.profile);
  /****** Updating tags in database ******/
  if (profile.knowledge && profile.knowledge.languages)
    profile.knowledge.languages = await Tags.service.normalizeTags(profile.knowledge.languages);
  if (profile.knowledge && profile.knowledge.curiosity)
    profile.knowledge.curiosity = await Tags.service.normalizeTags(profile.knowledge.curiosity);
  if (profile.professional && profile.professional.industry)
    profile.professional.industry = await Tags.service.normalizeTags(profile.professional.industry);
  if (profile.speaker && profile.speaker.otherpreferred)
    profile.speaker.otherpreferred = await Tags.service.normalizeTags(profile.speaker.otherpreferred);
  if (profile.speaker && profile.speaker.otherlooking)
    profile.speaker.otherlooking = await Tags.service.normalizeTags(profile.speaker.otherlooking);
  if (profile.speaker && profile.speaker.topic)
    profile.speaker.topic = await Tags.service.normalizeTags(profile.speaker.topic);

  user.profile = profile;

  const inserted = await Service.user(user);
//inserting location
  if (user.profile.place && user.profile.place.location && user.profile.place.location.address) {
    let place = Object.assign({}, user.profile.place);
    if (!place._id) {
      place.owner = inserted._id;
      place.entity = "USER";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }

  if (user.profile.achievements && user.profile.achievements.length > 0) {
    let achievements = Object.assign({}, user.profile.achievements);
    achievements.forEach(ach => {
      if (!ach._id) {
        ach.owner = inserted._id;
      }
      Achievement.service.achievement(ach);
    });
  }

  return inserted;
};
//------------------------------------------------------------------------------
Mutation.deleteUser = (root, { _id }, context) => {
  return Service.deleteUser(_id);
};

Mutation.updateSignUpStatus = (root, { _id, status }, context) => {
  return Service.signUpUser(_id, status);
};

export default Mutation;
