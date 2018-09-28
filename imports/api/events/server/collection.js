/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const collection = new Mongo.Collection('Events');

collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  from: {
    type: String,
    label: 'The type of owner (organization, communities or register user).',
    optional: true,
  },
  createdAt: {
    type: Date,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return new Date;
    },
  },
  updatedAt: {
    type: Date,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    },
  },
  startDate: {
    type: Date,
    label: 'The start date of the event.',
    optional: true,
  },
  endDate: {
    type: Date,
    label: 'The end date of the event.',
    optional: true,
  },
  title: {
    type: String,
    label: 'The title of the event.',
  },

  description: {
    type: String,
    label: 'The description of the event.',
    optional: true,
  },
  venueName: {
    type: String,
    label: 'The description of the event.',
    optional: true,
  },
  venueEmail: {
    type: String,
    label: 'The description of the event.',
    optional: true,
  },
  organizer: {
    type: String,
    label: 'The description of the event.',
    optional: true,
  },
  phone: {
    type: String,
    label: 'The description of the event.',
    optional: true
  },
  notes: {
    type: String,
    label: 'The description of the event.',
    optional: true
  },
  tickets: {
    type: Array,
    optional: true
  },
  'tickets.$': {
    type: Object,
    optional: true
  },
  'tickets.$.name': {
    type: String,
    optional: true
  },
  'tickets.$.description': {
    type: String,
    optional: true
  },
  'tickets.$.type': {
    type: String,
    optional: true
  },
  'tickets.$.available': {
    type: Number,
    optional: true
  },
  'tickets.$.min': {
    type: Number,
    optional: true
  },
  'tickets.$.max': {
    type: Number,
    optional: true
  },
  eventType: {
    type: Object,
    optional: true
  },
  'eventType.label': {
    type: String,
    optional: true
  },
  'eventType.value': {
    type: String,
    optional: true
  },
  sponsors: {
    type: Array,
    label: 'The sponsors of the event.',
    optional: true,
  },
  'sponsors.$': {
    type: Object,
  },
    'sponsors.$.type': {
        type: String,
        label: 'Speaker or sponsor type.',
        optional: true,
    },
  'sponsors.$.name': {
    type: String,
    label: 'Name of the speaker or sponsor.',
    optional: true,
  },
  'sponsors.$.email': {
    type: String,
    label: 'External email of sponsor not in our system.',
    optional: true,
  },
    'sponsors.$.prepare': {
        type: String,
        label: 'What the speaker should prepare.',
        optional: true,
    },
    'sponsors.$.details': {
        type: String,
        label: 'Sponsorship details.',
        optional: true,
    },
  'sponsors.$.logo': {
    type: Object,
    label: 'External logo of sponsor not in our system.',
    optional: true,
  },
  'sponsors.$.logo.imgSrc': {
    type: String,
    label: 'External logo of sponsor not in our system.',
    optional: true,
  },
  'sponsors.$.logo.imgFile': {
    type: Object,
    label: 'External logo of sponsor not in our system.',
    optional: true,
  },
  category: {
    type: Array,
    optional: true,
  },
  'category.$': {
    type: String,
    label: 'The category of the event.',
    optional: true,
  },
  attenders: {
    type: Object,
    label: 'The expected attenders of the event.',
    optional: true,
  },
  'attenders.min': {
    type: Number,
    optional: true,
  },
  'attenders.max': {
    type: Number,
    optional: true,
  },
  image: {
    type: String,
    label: 'The location of the job.',
    optional: true,
  },
  entity: {
    type: String,
    label: 'Name of the entity',
    defaultValue: 'EVENT'
  },
  views: {
    type: Number,
    label: 'Viewed Count',
    optional: true,
    defaultValue: 1,
  },
});

collection.attachSchema(schema);

export default collection;
