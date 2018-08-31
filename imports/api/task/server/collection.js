import BaseCollection from "../../base/collection";
import SimpleSchema from "simpl-schema";

const Task = new BaseCollection("tasks");

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
  project_id: {
    type: String,
    label: "The ID of the project this Task belongs to."
  },
  sprint_id: {
    type: String,
    label: "The ID of the sprint this Task belongs to."
  },
  requirement_id: {
    type: String,
    label: "The ID of the requirement this Task belongs to."
  },
  name: {
    type: String,
    label: "The title of the Task."
  },
  description: {
    type: String,
    label: "The description of the Task."
  },
  priority: {
    type: String,
    allowedValues: ["Critical","High","Low","Nice to have"],
    label: "Priority"
  },
  status: {
    type: String,
    label: "Task status, these should be one of Open, Doing, Testing, Done",
    autoValue() {
      return "Open";
    }
  },
  assigned: {
    type: String,
    required: false,
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
    required: false,
    label: "Assign history"
  },
  "ownerWork.$": {
    type: Object
  },
  "ownerWork.$.user_id": {
    type: String,
    label: "The Id of user"
  },
  "ownerWork.$.hours": {
    type: Number,
    label: "hours planned this task"
  },
  "ownerWork.$.workingHours": {
    type: Number,
    optional:true,
    label: "Working_hours in this task"
  },
  "ownerWork.$.endDate": {
    type: Date,
    optional:true,
    label: "Date of closed the task"
  },
  "ownerWork.$.note": {
    type: String,
    label: "Note",
    optional:true
  },
  hours: {
    type: Number,
    required: false,
    label: "Assigned hours"
  },
  logHours: {
    type: Number,
    required: false,
    label: "Log history"
  },
  labels: {
    type: Array,
    optional:true,
    label: "Task labels"
  },
  "labels.$": {
    type: String,
    label: "Task labels"
  }

});

Task.attachSchema(Task.schema);

export default Task;
