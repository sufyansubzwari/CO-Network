/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Events = new Mongo.Collection('Events');

Events.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Events.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Events.schema = new SimpleSchema({
    owner: {
        type: String,
        label: 'The ID of the user this document belongs to.',
    },
    from: {
        type: String,
        label: 'The type of owner (organization, communities or register user).',
    },
    createdAt: {
        type: Date,
        label: 'The date this document was created.',
        autoValue() {
            if (this.isInsert) return new Date;
        },
    },
    updatedAt: {
        type: String,
        label: 'The date this document was last updated.',
        autoValue() {
            if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
        },
    },
    startDate: {
        type: Date,
        label: 'The start date of the event.',
    },
    endDate: {
        type: Date,
        label: 'The end date of the event.',
    },
    title: {
        type: String,
        label: 'The title of the event.',
    },

    description: {
        type: String,
        label: 'The description of the event.',
    },
    venueName: {
        type: String,
        label: 'The description of the event.',
    },
    organizer: {
        type: String,
        label: 'The description of the event.',
    },
    phone: {
        type: String,
        label: 'The description of the event.',
        optional: true
    },
    notes: {
        type: String,
        label: 'The description of the event.',
        optional: true
    },
    ticketType: {
        type: Object,
        optional: true
    },
    'ticketType.label': {
        type: String,
        optional: true
    },
    'ticketType.value': {
        type: String,
        optional: true
    },
    eventType: {
        type: Object,
        optional: true
    },
    'eventType.label': {
        type: String,
        optional: true
    },
    'eventType.value': {
        type: String,
        optional: true
    },
    sponsors: {
        type: Array,
        label: 'The sponsors of the event.',
        optional: true,
    },
    'sponsors.$': {
        type: Object,
    },
    'sponsors.$.name': {
        type: String,
        label: 'Link to organization in our system.',
        optional: true,
    },
    'sponsors.$.email': {
        type: String,
        label: 'External email of sponsor not in our system.',
        optional: true,
    },
    'sponsors.$.logo': {
        type: Object,
        label: 'External logo of sponsor not in our system.',
        optional: true,
    },
    'sponsors.$.logo.imgSrc': {
        type: String,
        label: 'External logo of sponsor not in our system.',
        optional: true,
    },
    'sponsors.$.logo.imgFile': {
        type: Object,
        label: 'External logo of sponsor not in our system.',
        optional: true,
    },
    category: {
        type: Array
    },
    'category.$': {
        type: String,
        label: 'The categorys of the event.',
    },
    size: {
        type: String,
        label: 'The size of the event.',
    },
    image: {
        type: String,
        label: 'The location of the job.',
    },
    entity: {
        type: String,
        label: 'Name of the entity',
        defaultValue: 'EVENT'
    },
    views: {
        type: Number,
        label: 'Viewed Count',
        optional: true,
        defaultValue: 0,
    },
});

Events.attachSchema(Events.schema);

export default Events;
