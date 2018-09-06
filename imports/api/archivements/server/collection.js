/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Achievements = new Mongo.Collection('Achievements');

Achievements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Achievements.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Achievements.schema = new SimpleSchema({
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
  owner: {
    type: String,
  },
  type: {
    type: String,
    label: "The achievement type (academic, professional, course, patents, publications)"
  },
  institution: {
    type: String,
    label: "The achievement fields used in (academic)",
    optional: true,
  },
  study: {
    type: String,
    label: "The achievement fields used in (academic)",
    optional: true,
  },
  story: {
    type: String,
    label: "The achievement fields used in (academic)",
    optional: true,
  },
  degree: {
    type: String,
    label: "The achievement fields used in (academic)",
    optional: true,
  },
  organization: {
    type: String,
    label: "The achievement fields used in (professional)",
    optional: true,
  },
  position: {
    type: String,
    label: "The achievement fields used in (professional)",
    optional: true,
  },
  help: {
    type: String,
    label: "The achievement fields used in (professional)",
    optional: true,
  },
  experience: {
    type: String,
    label: "The achievement fields used in (professional)",
    optional: true,
  },
  name: {
    type: String,
    label: "The achievement fields used in (course, publications)",
    optional: true,
  },
  link: {
    type: String,
    label: "The achievement fields used in (course, patents, publications)",
    optional: true,
  },
  level: {
    type: String,
    label: "The achievement fields used in (course)",
    optional: true,
  },
  category: {
    type: Array,
    label: "The achievement fields used in (course, patents, publications)",
    optional: true,
  },
  'category.$': {
    type: String,
    optional: true,
  },
  id: {
    type: String,
    label: "The achievement fields used in (patents)",
    optional: true,
  },
  year: {
    type: String,
    label: "The achievement fields used in (publications)",
    optional: true,
  },
  explain: {
    type: String,
    label: "The achievement fields used in (publications)",
    optional: true,
  },
});

Achievements.attachSchema(Achievements.schema);

export default Achievements;
