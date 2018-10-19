/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Places = new Mongo.Collection('Places');

Places.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Places.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Places.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  location: {
    type: Object,
    label: 'The location of the job.',
  },
  'location.cityCountry': {
    type: Object,
    optional: true,
    label: 'The location of the job.',
  },
  'location.cityCountry.city': {
    type: String,
    optional: true,
    label: 'The location of the job.',
  },
  'location.cityCountry.state': {
    type: String,
    optional: true,
    label: 'The location of the job.',
  },
  'location.cityCountry.entire': {
    type: String,
    optional: true,
    label: 'The location of the job.',
  },
  'location.cityCountry.country': {
    type: String,
    optional: true,
    label: 'The location of the job.',
  },
  'location.address': {
    type: String,
  },
  'location.location': {
    type: Object,
  },
  'location.location.lng': {
    type: Number,
  },
  'location.location.lat': {
    type: Number,
  },
  entity: {
    type: String,
    label: 'The type of the source that is been follow'
  },

});

Places.attachSchema(Places.schema);

export default Places;
