import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Messages = new Mongo.Collection('Messages');

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Messages.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
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
      if (this.isInsert || this.isUpdate) return new Date();
    },
  },
  receptor: {
    type: String,
    label: 'The user or community that the message is to.',
  },
  type: {
    type: String,
    label: 'The type of the message.',
  },
  text: {
    type: String,
  },
  read: {
    type: Boolean,
    autoValue() {
      return false;
    },
    optional: true,
  },
  replies:{
    type: Array,
    optional: true,
  },
  'replies.$':{
    type: this,
    optional: true,
  },
  attachment: {
    type: String,
    optional: true,
  },
});
Messages.attachSchema(Messages.schema);

export default Messages;