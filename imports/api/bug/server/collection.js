import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Bug = new Mongo.Collection('Bug');

Bug.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Bug.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Bug.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this Bug was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },

  updatedAt: {
    type: String,
    label: 'The date this Bug was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    },
  },
  name: {
    type: String,
    label: 'The title of the Bug.',
  },
  description: {
    type: String,
    label: 'The description of the Bug.',
  },
  project_id: {
    type: String,
    label: 'The ID of the project on this Bug.',
  },

});

Bug.attachSchema(Bug.schema);

export default Bug;
