/* eslint-disable consistent-return */

import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import BaseCollection from "../../base/collection";

const Tags = new BaseCollection("Tags");

Tags.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tags.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Tags.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "The date this document was created.",
    autoValue() {
      if (this.isInsert) return new Date();
    }
  },
  updatedAt: {
    type: Date,
    label: "The date this document was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    }
  },
  name: {
    type: String,
    optional: true
  },
  label: {
    type: String,
    optional: true
  },
  value: {
    type: String,
    optional: true
  },
  used: {
    type: Number,
    optional: true,
    defaultValue: 1
  },
  categories: {
    type: Array,
    optional: true
  },
  "categories.$": {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  }
});

Tags.attachSchema(Tags.schema);

export default Tags;
