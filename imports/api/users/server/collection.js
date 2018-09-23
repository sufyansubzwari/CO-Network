import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Constants from "../../constants";

//------------------------------------------------------------------------------
// COLLECTION:
//------------------------------------------------------------------------------
// const collection = new Mongo.Collection('users');
const collection = Meteor.users;

//------------------------------------------------------------------------------
// ALLOW & DENY RULES:
//------------------------------------------------------------------------------
/**
 * @see {@link https://themeteorchef.com/recipes/building-a-user-admin/}
 * To save face, we can “lock down” all of our rules when we define our collection
 * to prevent any client-side database operations from taking place. This means
 * that when we interact with the database, we’re required to do it from the server
 * (a trusted environment) via methods.
 * @see {@link http://docs.meteor.com/#/full/deny}
 * When a client tries to write to a collection, the Meteor server first checks the
 * collection's deny rules. If none of them return true then it checks the
 * collection's allow rules. Meteor allows the write only if no deny rules return
 * true and at least one allow rule returns true.
 */
collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

//------------------------------------------------------------------------------
// SCHEMA(S):
//------------------------------------------------------------------------------
/**
 * @see {@link http://themeteorchef.com/snippets/using-the-collection2-package/}
 */
const schema = new SimpleSchema({
  createdAt: {
    type: Date
  },
  profile: {
    type: Object,
    optional: true
  },
  "profile.name": {
    type: String,
    max: 150,
    optional: true
  },
  "profile.user_id": {
    type: String,
    optional: true
  },
  "profile.isSignUp": {
    type: Boolean,
    optional: true
  },
  "profile.lastName": {
    type: String,
    max: 150,
    optional: true
  },
  "profile.image": {
    type: String,
    optional: true
  },
  "profile.nickName": {
    type: String,
    optional: true
  },
  "profile.cover": {
    type: String,
    optional: true
  },
  "profile.email": {
    type: String,
    optional: true
  },
  "profile.gender": {
    type: String,
    optional: true
  },
  "profile.website": {
    type: String,
    optional: true
  },
  "profile.phone": {
    type: String,
    optional: true
  },
  "profile.loginCount": {
    type: Number,
    optional: true
  },
  "profile.identities": {
    type: Array,
    optional: true
  },
  "profile.identities.$": {
    type: Object,
    optional: true
  },
  "profile.identities.$.provider": {
    type: String,
    optional: true
  },
  "profile.identities.$.user_id": {
    type: String,
    optional: true
  },
  "profile.identities.$.connection": {
    type: String,
    optional: true
  },
  "profile.identities.$.isSocial": {
    type: Boolean,
    optional: true
  },
  "profile.social": {
    type: Object,
    optional: true
  },
  "profile.social.github": {
    type: String,
    optional: true
  },
  "profile.social.facebook": {
    type: String,
    optional: true
  },
  "profile.social.twitter": {
    type: String,
    optional: true
  },
  "profile.social.linkedin": {
    type: String,
    optional: true
  },
  "profile.aboutMe": {
    type: Object,
    optional: true
  },
  "profile.aboutMe.yourPassion": {
    type: String,
    optional: true
  },
  "profile.aboutMe.existingProblem": {
    type: String,
    optional: true
  },
  "profile.aboutMe.steps": {
    type: String,
    optional: true
  },
  "profile.knowledge": {
    type: Object,
    optional: true
  },
  "profile.knowledge.languages": {
    type: Array,
    optional: true
  },
  "profile.knowledge.languages.$": {
    type: String,
    optional: true
  },
  "profile.knowledge.curiosity": {
    type: Array,
    optional: true
  },
  "profile.knowledge.curiosity.$": {
    type: String,
    optional: true
  },
  "profile.knowledge.lookingFor": {
    type: Array,
    optional: true
  },
  "profile.knowledge.lookingFor.$": {
    type: Object,
    optional: true
  },
  "profile.knowledge.lookingFor.$.label": {
    type: String,
    optional: true
  },
  "profile.knowledge.lookingFor.$.value": {
    type: String,
    optional: true
  },
  "profile.knowledge.lookingFor.$.active": {
    type: Boolean,
    optional: true
  },
  "profile.professional": {
    type: Object,
    optional: true
  },
  "profile.professional.seeking": {
    type: Boolean,
    optional: true
  },
  "profile.professional.salaryRange": {
    type: Object,
    optional: true
  },
  "profile.professional.salaryRange.min": {
    type: Number,
    optional: true
  },
  "profile.professional.salaryRange.max": {
    type: Number,
    optional: true
  },
  "profile.professional.jobType": {
    type: Array,
    optional: true
  },
  "profile.professional.jobType.$": {
    type: Object,
    optional: true
  },
  "profile.professional.jobType.$.label": {
    type: String,
    optional: true
  },
  "profile.professional.jobType.$.value": {
    type: String,
    optional: true
  },
  "profile.professional.jobType.$.active": {
    type: Boolean,
    optional: true
  },
  "profile.professional.industry": {
    type: Array,
    optional: true
  },
  "profile.professional.industry.$": {
    type: String,
    optional: true
  },
  "profile.speaker": {
    type: Object,
    optional: true
  },
  "profile.speaker.join": {
    type: Boolean,
    optional: true
  },
  "profile.speaker.topic": {
    type: Array,
    optional: true
  },
  "profile.speaker.topic.$": {
    type: String,
    optional: true
  },
  "profile.speaker.style": {
    type: Array,
    optional: true
  },
  "profile.speaker.style.$": {
    type: Object,
    optional: true
  },
  "profile.speaker.style.$.label": {
    type: String,
    optional: true
  },
  "profile.speaker.style.$.value": {
    type: String,
    optional: true
  },
  "profile.speaker.stage": {
    type: Array,
    optional: true
  },
  "profile.speaker.stage.$": {
    type: Object,
    optional: true
  },
  "profile.speaker.stage.$.label": {
    type: String,
    optional: true
  },
  "profile.speaker.stage.$.value": {
    type: String,
    optional: true
  },
  "profile.speaker.otherpreferred": {
    type: Array,
    optional: true
  },
  "profile.speaker.otherpreferred.$": {
    type: String,
    optional: true
  },
  "profile.speaker.lookingFor": {
    type: Array,
    optional: true
  },
  "profile.speaker.lookingFor.$": {
    type: Object,
    optional: true
  },
  "profile.speaker.lookingFor.$.label": {
    type: String,
    optional: true
  },
  "profile.speaker.lookingFor.$.value": {
    type: String,
    optional: true
  },
  "profile.speaker.lookingFor.$.active": {
    type: Boolean,
    optional: true
  },
  "profile.speaker.otherlooking": {
    type: Array,
    optional: true
  },
  "profile.speaker.otherlooking.$": {
    type: String,
    optional: true
  },
  //Emails
  emails: {
    type: Array,
    label: "[{ address, verified }, ...]",
    optional: true
  },

  "emails.$": {
    type: Object
  },

  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  //Services
  services: {
    type: Object,
    label: "Auth services such as facebook, google plus or twitter",
    optional: true,
    blackbox: true
  },

  roles: {
    type: Array,
    defaultValue: []
  },

  "roles.$": {
    type: String,
    allowedValues: Constants.ALL_ROLES
  },

  subscriptions: {
    type: Array,
    label: "Array of push subscriptions",
    defaultValue: []
  },

  "subscriptions.$": {
    type: Object
  },

  "subscriptions.$.endpoint": {
    type: String,
    label: "Push subscription URL"
  },

  "subscriptions.$.keys": {
    type: Object,
    label: "User encryption keys"
  },

  "subscriptions.$.keys.auth": {
    type: String,
    label: "User public encryption key"
  },

  "subscriptions.$.keys.p256dh": {
    type: String,
    label: "User auth secret"
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

collection.attachSchema(schema);

export default collection;
