import BaseCollection from "../base/collection";
import SimpleSchema from "simpl-schema";

const Bug = new BaseCollection("Bug");

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
    label: 'The ID of the project on this Bug.',
    optional:true
  },

});

Bug.attachSchema(Bug.schema);

export default Bug;
