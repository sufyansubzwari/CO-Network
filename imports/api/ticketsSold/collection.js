/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const TicketsSold = new Mongo.Collection('TicketsSold');

TicketsSold.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

TicketsSold.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

TicketsSold.schema = new SimpleSchema({
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
  ticketId: {
    type: String,
  },
  event: {
    type: String,
  },
  userId: {
    type: String,
  },
  buyId:{
    type: String
  },
  quantity: {
    type: Number,
  },
  client_ip: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  cardInfo: {
    type: Object,
    blackbox: true,
  },
  chargeInfo: {
    type: Object,
    blackbox: true,
  }
});

TicketsSold.attachSchema(TicketsSold.schema);

export default TicketsSold;
