/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const StripeCustomer = new Mongo.Collection('StripeCustomer');

StripeCustomer.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

StripeCustomer.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

StripeCustomer.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of user owner',
  },
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
  customer: {
    type: String,
    label: 'The stripe customer '
  }

});

StripeCustomer.attachSchema(StripeCustomer.schema);

export default StripeCustomer;
