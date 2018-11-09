/* eslint-disable consistent-return */

import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const StripeCustomer = new Mongo.Collection("StripeCustomer");

StripeCustomer.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

StripeCustomer.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

StripeCustomer.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The ID of user owner"
  },
  createdAt: {
    type: String,
    label: "The date this document was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this document was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  customer: {
    type: String,
    label: "The stripe customer "
  },
  stripeToken: {
    type: Object,
    label: "The stripe customer ",
    blackbox: true,
    optional: true
  },
  type: {
    type: String,
    label: "The type of service (stripe or paypal)"
  }
});

StripeCustomer.attachSchema(StripeCustomer.schema);

export default StripeCustomer;
