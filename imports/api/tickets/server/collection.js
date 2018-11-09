/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Tickets = new Mongo.Collection('Tickets');

Tickets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tickets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Tickets.schema = new SimpleSchema({
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
  owner: {
    type: String,
  },
  type: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  total: {
    type: Number,
    label: 'The start amount of tickets when created.',
    autoValue() {
      if (this.isInsert){
        return (this.field("available").value)
      }
    },
  },
  available: {
    type: Number,
    optional: true
  },
  price: {
    type: Number,
    optional: true
  },
});

Tickets.attachSchema(Tickets.schema);

export default Tickets;
