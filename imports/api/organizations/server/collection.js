/* eslint-disable consistent-return */

import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import Constants from "../../constants";

const Organizations = new Mongo.Collection("Organizations");

Organizations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Organizations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Organizations.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The ID of the user this document belongs to."
  },
  createdAt: {
    type: Date,
    label: "The date this document was created.",
    autoValue() {
      if (this.isInsert) return new Date();
    }
  },
  updatedAt: {
    type: Date,
    label: "The date this document was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    }
  },

  entity: {
    type: String,
    label: "Name of the entity",
    defaultValue: "ORGANIZATION"
  },
  image: { type: String, optional: true },
  enable: { type: Boolean, optional: true, defaultValue: true },
  checkStatus: {
    type: String,
    allowedValues: Constants.ORGANIZATION_CHECK_STATUS,
    defaultValue: "approved"
  },
  cover: { type: String, optional: true },
  name: { type: String, optional: true },
  employees: { type: Object, optional: true },
  "employees.value": { type: String, optional: true },
  "employees.label": { type: String, optional: true },
  orgType: { type: Array, optional: true },
  "orgType.$": { type: Object, optional: true },
  "orgType.$.label": { type: String, optional: true },
  description: { type: Array, optional: true },
  "description.$": { type: String, optional: true },
  website: { type: String, optional: true },
  actively: { type: Array, optional: true },
  "actively.$": { type: Object, optional: true },
  "actively.$.label": { type: String, optional: true },
  identities: {
    type: Array,
    optional: true
  },
  "identities.$": {
    type: Object,
    optional: true
  },
  "identities.$.provider": {
    type: String,
    optional: true
  },
  "identities.$.user_id": {
    type: String,
    optional: true
  },
  "identities.$.connection": {
    type: String,
    optional: true
  },
  "identities.$.isSocial": {
    type: Boolean,
    optional: true
  },
  "identities.$.profileData": {
    type: Object,
    blackbox: true,
    optional: true
  },
  social: { type: Object, optional: true },
  "social.github": { type: String, optional: true },
  "social.linkedin": { type: String, optional: true },
  "social.facebook": { type: String, optional: true },
  "social.twitter": { type: String, optional: true },
  "social.google": { type: String, optional: true },
  contact: { type: Object, optional: true },
  "contact.email": { type: String, optional: true },
  "contact.name": { type: String, optional: true },
  "contact.phone": { type: String, optional: true },
  services: { type: Object, optional: true },
  "services.relocated": { type: Boolean, optional: true },
  "services.seeking": { type: Boolean, optional: true },
  "services.hostEvents": { type: Boolean, optional: true },
  reason: { type: Object, optional: true },
  "reason.bio": { type: String, optional: true },
  "reason.vision": { type: String, optional: true },
  "reason.orgDefine": { type: String, optional: true },
  tech: { type: Object, optional: true },
  "tech.industry": { type: Array, optional: true },
  "tech.industry.$": { type: String, optional: true },
  "tech.stack": {
    type: Array,
    optional: true
  },
  "tech.stack.$": {
    type: Object,
    optional: true
  },
  "tech.stack.$.tag": {
    type: String,
    optional: true,
    label: "ID of tag entity"
  },
  "tech.stack.$.level": {
    type: String,
    optional: true,
    label: "level of the tag"
  },
  "tech.stack.$.icon": {
    type: String,
    optional: true,
    label: "icon of the tag"
  },
  "tech.stack.$.levelColor": {
    type: String,
    optional: true,
    label: "color of the tag"
  },
  "tech.salaryRange": { type: Object, optional: true },
  "tech.salaryRange.min": { type: Number, optional: true },
  "tech.salaryRange.max": { type: Number, optional: true },
  "tech.jobType": { type: Array, optional: true },
  "tech.jobType.$": { type: Object, optional: true },
  "tech.jobType.$.label": { type: String, optional: true },
  products: {
    type: Array,
    optional: true
  },
  "products.$": {
    type: Object,
    optional: true
  },
  "products.$.name": {
    type: String,
    optional: true
  },
  "products.$.link": {
    type: String,
    optional: true
  },
  "products.$.edit": {
    type: Boolean,
    optional: true
  },
  "products.$.type": {
    type: String,
    optional: true
  },
  "products.$.explain": {
    type: String,
    optional: true
  },
  "products.$.files": {
    type: Array,
    optional: true
  },
  "products.$.files.$": {
    type: Object,
    optional: true
  },
  "products.$.files.$.name": {
    type: String,
    optional: true
  },
  "products.$.files.$.link": {
    type: String,
    optional: true
  },
  media: {
    type: Array,
    optional: true
  },
  "media.$": {
    type: Object,
    optional: true
  },
  "media.$.title": {
    type: String,
    optional: true
  },
  "media.$.link": {
    type: String,
    optional: true
  },
  "media.$.edit": {
    type: Boolean,
    optional: true
  },
  "media.$.explain": {
    type: String,
    optional: true
  },
  "media.$.files": {
    type: Object,
    optional: true
  },
  "media.$.files.name": {
    type: String,
    optional: true
  },
  "media.$.files.link": {
    type: String,
    optional: true
  },
  views: {
    type: Number,
    label: "Viewed Count",
    optional: true,
    defaultValue: 1
  }
});

Organizations.attachSchema(Organizations.schema);

export default Organizations;
