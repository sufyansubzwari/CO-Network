/* eslint-disable consistent-return */

import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/collection/index';

const Notifications = new BaseCollection('Notifications');

Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Notifications.schema = new SimpleSchema({
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
    label: 'The title of the notification.',
    optional: true,
  },
  message: {
    type: String,
    optional: true,
    label: 'The message of the notification.',
  },
  action: {
    type: String,
    label: 'The action that generate the notification.',
  },
  entity: {
    type: String,
    label: 'The entity type that generate the notification.',
  },
  entityId: {
    type: String,
    label: 'The entity id that generate the notification.',
  },
  viewed: {
    type: Boolean,
    label: 'The status of the notification.',
    optional: true,
    defaultValue: false,
  },
});

Notifications.attachSchema(Notifications.schema);

export default Notifications;
