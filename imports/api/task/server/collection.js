import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Task = new Mongo.Collection("Task");

Task.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Task.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Task.schema = new SimpleSchema({
  requirement_id: {
    type: String,
    label: "The ID of the project this Task belongs to."
  },
  createdAt: {
    type: String,
    label: "The date this Task was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },

  updatedAt: {
    type: String,
    label: "The date this Task was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The title of the Task."
  },
  description: {
    type: String,
    label: "The description of the Task."
  },
  assigned: {
    type: String,
    required:false,
    label: "The ID of the user work on this task."
  },
  starDate: {
    type: String,
    label: "The date this Task was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  endDate: {
    type: String,
    label: "The date this Task was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  ownerWork: {
    type: Array,
    required:false,
    label: "Assign history"
  },
  'ownerWork.$': {
    type: Object,
  },
  'ownerWork.$.user_id': {
    type: String,
    label: 'The Id of user',
  },
  'ownerWork.$.working_hours': {
    type: Number,
    label: 'Working_hours n this task',
  },
  hours: {
    type: Number,
    required:false,
    label: "Assign history"
  },
  status: {
    type:String,
    label: 'Task status, these should be one of Open, Doing, Testing, Done',
    autoValue() {
      return "Open";
    }
  }
});

Task.attachSchema(Task.schema);

export default Task;
