/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Tags = new Mongo.Collection('Tags');

Tags.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tags.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Tags.schema = new SimpleSchema({
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
  name: {
    type: String,
  },
  label: {
    type: String,
  },
  value: {
    type: String
  },
  used: {
    type: Number,
    optional: true,
  },
  categories: {
    type: Array
  },
  'categories.$': {
    type: String
  },
  types: {
    type: String
  }
});

Tags.attachSchema(Tags.schema);

export default Tags;
