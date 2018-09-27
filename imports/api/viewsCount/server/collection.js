/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ViewsCount = new Mongo.Collection('ViewsCount');

ViewsCount.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ViewsCount.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

ViewsCount.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return new Date();
    },
  },
  updatedAt: {
    type: Date,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    },
  },
  user: {
    type: String,
    label: 'The user if is logged.',
  },
  browserCookies: {
    type: String,
    label: 'The cookie id of the browser.',
    optional: true
  },
  entityViewed: {
    type: String,
    label: 'The id of the entity Viewed.'
  },
  entityType: {
    type: String,
    label: 'The type of the entity Viewed.'
  },
  lastView: {
    type: Date,
    label: 'The last time of the entity Viewed',
  }
});

ViewsCount.attachSchema(ViewsCount.schema);

export default ViewsCount;
