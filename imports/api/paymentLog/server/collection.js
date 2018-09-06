/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const PaymentLog = new Mongo.Collection('PaymentLog');

PaymentLog.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

PaymentLog.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

PaymentLog.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of user owner',
  },
  createdAt: {
    type: Date,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date());
    },
  },
  updatedAt: {
    type: Date,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date());
    },
  },
  concept:{
    type:String,
    label: 'The stripe customer '
  },
  expirationDate:{
    type: Date,
    label: 'expiration date '
  }

});

PaymentLog.attachSchema(PaymentLog.schema);

export default PaymentLog;
