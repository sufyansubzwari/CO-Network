/* eslint-disable consistent-return */

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Organizations = new Mongo.Collection('Organizations');

Organizations.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

Organizations.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});

Organizations.schema = new SimpleSchema({
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

    entity: {
        type: String,
        label: 'Name of the entity',
        defaultValue: 'ORGANIZATION'
    },
    info: {type: Object, label: 'Name of the entity'},
    'info.image': {type: String, optional: true},
    'info.cover': {type: String, optional: true},
    'info.name': {type: String, optional: true},
    'info.employees': {type: Object, optional: true},
    'info.employees.value': {type: String, optional: true},
    'info.employees.label': {type: String, optional: true},
    'info.orgType': {type: String, optional: true},
    'info.description': {type: String, optional: true},
    social: {type: Object, optional: true},
    'social.github': {type: String, optional: true},
    'social.linkedin': {type: String, optional: true},
    'social.facebook': {type: String, optional: true},
    'social.website': {type: String, optional: true},
    'social.twitter': {type: String, optional: true},
    contact: {type: Object, optional: true},
    'contact.email': {type: String, optional: true},
    'contact.phone': {type: String, optional: true},
    'contact.name': {type: String, optional: true},
    services: {type: Object, optional: true},
    'services.relocated': {type: Boolean, optional: true},
    'services.seeking': {type: Boolean, optional: true},
    'services.hostEvents': {type: Boolean, optional: true},
    reason: {type: Object, optional: true},
    'reason.languages': {type: String, optional: true},
    'reason.vision': {type: String, optional: true},
    'reason.mission': {type: String, optional: true},
    'reason.culture': {type: String, optional: true},
    'reason.orgDefine': {type: String, optional: true},
    'reason.product': {type: String, optional: true},
    'reason.industry': {type: String, optional: true},
    views: {
        type: Number,
        label: 'Viewed Count',
        optional: true,
        defaultValue: 0,
    },
});

Organizations.attachSchema(Organizations.schema);

export default Organizations;
