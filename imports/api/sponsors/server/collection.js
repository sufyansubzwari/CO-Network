/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const collection = new Mongo.Collection('Sponsors');

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
    label: 'The ID of the event this document belongs to.',
  },
  external: {
    type: Boolean,
    label: 'If external user or not',
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
  type: {
    type: String,
    label: 'Speaker or Sponsor',
    optional: true,
  },
  user: {
    type: String,
    label: 'ID of the user',
    optional: true,
  },
  name: {
    type: String,
    label: 'Name of the Speaker or Sponsor.',
    optional: true,
  },
  email: {
    type: String,
    label: 'Email of the speaker or sponsor.',
    optional: true,
  },
  description: {
    type: String,
    label: 'The description of the speaker or sponsor.',
    optional: true
  }
});

collection.attachSchema(schema);

export default collection;
