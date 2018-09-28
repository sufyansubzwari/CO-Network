/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const JobApply = new Mongo.Collection('JobApply');

JobApply.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

JobApply.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

JobApply.schema = new SimpleSchema({
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
  firstName: {
      type: String,
  },
  lastName: {
      type: String,
  },
  country: {
      type: String,
  },
  cities: {
      type: String,
  },
  email: {
      type: String,
  },
  phone: {
      type: String,
      optional: true,
  },
  website: {
      type: String,
      optional: true,
  },
  cover:{
    type: String,
    optional: true,
  },
  image:{
    type: String,
    optional: true,
  },
  // twitterUser: {
  //     type: String,
  //     optional: true,
  // },
  // facebookUser: {
  //     type: String,
  //     optional: true,
  // },
  // githubUser: {
  //     type: String,
  //     optional: true,
  // },
  // linkedinUser: {
  //     type: String,
  //     optional: true,
  // },
  remote: {
      type: Boolean,
  },
  jobSpecific:{
    type: Object,
    optional:true,
  },
  'jobSpecific.candidate': {
    type: String,
    optional: true,
  },
  'jobSpecific.existingProblem': {
    type: String,
    optional: true,
  },
  'jobSpecific.passion': {
    type: String,
    optional: true,
  },
  'jobSpecific.questions': {
    type: String,
    optional: true,
  },
  'jobSpecific.steps': {
    type: String,
    optional: true,
  },
  professional:{
    type: Object,
    optional: true
  },
  'professional.salaryRange':{
    type: Object,
    optional: true
  },
  'professional.salaryRange.min': {
    type: Number,
  },
  'professional.salaryRange.max': {
    type: Number,
  },
  'professional.degree':{
    type: Object,
    optional: true
  },
  'professional.degree.label':{
    type: String,
    optional: true
  },
  'professional.degree.value':{
    type: String,
    optional: true
  },
  'professional.expertise':{
    type: Array,
    optional: true
  },
  'professional.expertise.$':{
    type: Object,
    optional: true
  },
  'professional.expertise.$.tag':{
    type: String,
    optional: true
  },
  'professional.expertise.$.level':{
    type: String,
    optional: true
  },
  'professional.expertise.$.levelColor':{
    type: String,
    optional: true
  },
  'professional.expertise.$.icon':{
    type: String,
    optional: true
  },
  'professional.industry':{
    type: Array,
    optional: true
  },
  'professional.industry.$':{
    type: String,
    optional: true
  },
  'professional.languages':{
    type: Array,
    optional: true
  },
  'professional.languages.$':{
    type: Object,
    optional: true
  },
  'professional.languages.$.tag':{
    type: String,
    optional: true
  },
  'professional.languages.$.level':{
    type: String,
    optional: true
  },
  'professional.languages.$.icon':{
    type: String,
    optional: true
  },
  'professional.languages.$.levelColor':{
    type: String,
    optional: true
  },
  experience: {
    type: Array,
    optional: true,
  },
  'experience.$': {
    type: Object,
    optional: true,
  },
  'experience.$.years': {
    type: Object,
    optional: true,
  },
  'experience.$.years.label': {
    type: String,
    optional: true,
  },
  'experience.$.years.value': {
    type: String,
    optional: true,
  },
  'experience.$.employer': {
    type: String,
    optional: true,
  },
  'experience.$.position': {
    type: String,
    optional: true,
  },
  'experience.$.description': {
    type: String,
    optional: true,
  },
  job: {
    type: String,
  },

});

JobApply.attachSchema(JobApply.schema);

export default JobApply;
