import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Followers = new Mongo.Collection('Followers');

Followers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Followers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Followers.schema = new SimpleSchema({
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
  entityId: {
    type: String,
    label: 'The ID of the entity(source) that is been follow'
  },
  entity: {
    type: String,
    label: 'The type of the source that is been follow'
  },
  followers: {
    type: Array,
    label: 'Array of followers',
  },
  'followers.$': {
    type: String,
    label: 'The ID of the follower entity(source)',
  },
});

Followers.attachSchema(Followers.schema);

export default Followers;