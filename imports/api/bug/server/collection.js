import BaseCollection from "../../base/collection";
import SimpleSchema from "simpl-schema";

const Bug = new BaseCollection('bugs');

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

  name: {
    type: String,
    label: 'The title of the Bug.',
  },
  description: {
    type: String,
    label: 'The description of the Bug.',
  },
  task_id: {
    type: String,
    label: 'The Id task of the Bug.',
  },
  owner: {
    type: String,
    label: 'The user who registered the task',
  },

});

Bug.attachSchema(Bug.schema);

export default Bug;
