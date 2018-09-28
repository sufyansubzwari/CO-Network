/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../../base/collection';

const Jobs = new BaseCollection('Jobs');

Jobs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Jobs.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Jobs.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
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
  title: {
    type: String,
    label: 'The title of the job.',
  },
  description: {
    type: String,
    optional: true,
    label: 'The description of the job.',
  },
  organization: {
    type: String,
    optional: true
  },
  remote: {
    type: Boolean,
    label: 'The remote of the job.',
    optional: true,
  },
  salaryRange: {
    optional: true,
    type: Object,
    label: 'The salary range of the job.',
  },
  'salaryRange.min': {
    type: Number,
    optional: true,
  },
  'salaryRange.max': {
    type: Number,
    optional: true,
  },
  'salaryRange.frequency': {
    type: String,
    optional: true,
  },
  industry: {
    optional: true,
    type: String
  },
    languages: {
        type: Array,
        optional: true
    },
    "languages.$": {
        type: Object,
        optional: true
    },
    "languages.$.tag": {
        type: String,
        optional: true,
        label: "ID of tag entity"
    },
    "languages.$.level": {
        type: String,
        optional: true,
        label: "level of the tag"
    },
    "languages.$.icon": {
        type: String,
        optional: true,
        label: "icon of the tag"
    },
    "languages.$.levelColor": {
        type: String,
        optional: true,
        label: "color of the tag"
    },
  jobType: {
    optional: true,
    type: Array,
  },
  'jobType.$': {
    type: Object,
  },
  'jobType.$.value': {
    type: String,
  },
  'jobType.$.label': {
    type: String,
  },
  jobExperience: {
    optional: true,
    type: Array,
  },
  'jobExperience.$': {
    type: Object,
  },
  'jobExperience.$.value': {
    type: String,
  },
  'jobExperience.$.label': {
    type: String,
  },
  positionTags: {
    optional: true,
    type: Array
  },
  'positionTags.$': {
    optional: true,
    type: String
  },
  jobResponsibility: {
    optional: true,
    type: String,
    label: 'The location of the job.',
  },
  culture: {
    optional: true,
    type: String,
    label: 'The location of the job.',
  },
  aboutUsTeam: {
    optional: true,
    type: String,
    label: 'The location of the job.',
  },
  candidateQuestions: {
    optional: true,
    type: String,
    label: 'The location of the job.',
  },
  image: {
    optional: true,
    type: String,
    label: 'The location of the job.',
  },
  entity: {
    optional: true,
    type: String,
    label: 'Name of the entity',
    defaultValue: 'JOB'
  },
  views: {
    type: Number,
    label: 'Viewed Count',
    optional: true,
    defaultValue: 1,
  },
});

Jobs.attachSchema(Jobs.schema);

export default Jobs;
