import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Messages = new Mongo.Collection("Messages");

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Messages.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The ID of the user this document belongs to."
  },
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
  receptor: {
    type: String,
    label: "The user or community that the message is to."
  },
  type: {
    type: String,
    label: "The type of the message."
  },
  text: {
    type: String
  },
  read: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  replies: {
    type: Array,
    optional: true
  },
  "replies.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  attachment: {
    type: Array,
    optional: true
  },
  "attachment.$": {
    type: Object,
    optional: true
  },
  "attachment.$.name": {
    type: String,
    optional: true
  },
  "attachment.$.type": {
    type: String,
    optional: true
  },
  "attachment.$.link": {
    type: String,
    optional: true
  },
  images: {
    type: Array,
    optional: true
  },
  "images.$": {
    type: Object,
    optional: true
  },
  "images.$.name": {
    type: String,
    optional: true
  },
  "images.$.type": {
    type: String,
    optional: true
  },
  "images.$.link": {
    type: String,
    optional: true
  },
  deleted: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
});
Messages.attachSchema(Messages.schema);

export default Messages;
