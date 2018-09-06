import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Following = new Mongo.Collection('Following');

Following.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Following.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Following.schema = new SimpleSchema({
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
    label: 'The ID of the entity(source) that is been Following'
  },
  entity: {
    type: String,
    label: 'The type of the source that is been Following'
  },
  followings: {
    type: Array,
    label: 'Array of followers',
  },
  'followings.$': {
    type: String,
    label: 'The ID of the follower entity(source)',
  },
});

Following.attachSchema(Following.schema);

export default Following;