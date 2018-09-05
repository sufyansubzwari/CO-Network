/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const FeedBack = new Mongo.Collection('FeedBack');

FeedBack.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

FeedBack.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

FeedBack.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date());
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date());
    },
  },
  title: {
    type: String,
    label: 'The feedback title.'
  },
  email: {
    type: String,
    label: 'The user email.'
  },
  type: {
    type: String,
    label: 'The feedback type (Bug, feature, improve...).'
  },
  text:{
    type:String,
    label: 'The feedback description.'
  }

});

FeedBack.attachSchema(FeedBack.schema);

export default FeedBack;
