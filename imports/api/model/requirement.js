import BaseCollection from "../base/collection";
import SimpleSchema from "simpl-schema";

const Requirement = new BaseCollection("Requirements");

Requirement.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Requirement.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
/**
 * @summary Requirement Collection had task collection embed
 * */
Requirement.schema = new SimpleSchema({
  name: {
    type: String,
    label: "The title of the Requirement."
  },
  description: {
    type: String,
    label: "The description of the Requirement."
  },
  priority: {
    type: String,
    allowedValues: ["Critical","High","Low","Nice to have"],
    label: "Priority"
  },
  sprint: {
    type: String,
    label: "Sprint id",
    optional:true
  },
  tasks: {
    type: Array,
    required: false,
    label: "Assign history"
  },
  "tasks.$": {
    type: Object
  },
  "tasks.$._id": {
    type: String,
    label: "task id"
  },
  "tasks.$.name": {
    type: String,
    label: "task name"
  },
  "tasks.$.description": {
    type: String,
    label: "task description"
  },
  "tasks.$.status": {
    type: Array,
   label: "task status"
  },
  "tasks.$.status.$": {
    type: String,
      label: "task status"
  },
  "tasks.$assigned": {
    type: String,
    required: false,
    label: "The ID of the user work on this task."
  },
  "tasks.$.hours": {
    type: Number,
    required: false,
    label: "Assigned hours"
  },
  "tasks.$.logHours": {
    type: Number,
    required: false,
    label: "Log history"
  },
  "tasks.$.ownerWork": {
    type: Array,
    required: false,
    label: "Assign history"
  },
  "tasks.$.ownerWork.$": {
    type: Object
  },
  "tasks.$.ownerWork.$.user_id": {
    type: String,
    label: "The Id of user"
  },
  "tasks.$.tasks.$.labels": {
    type: Array,
    label: "task labels"
  },
  "tasks.$.labels.$": {
    type: String,
    label: "task labels"
  },
  "tasks.$.starDate": {
    type: String,
    label: "task start date.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  "tasks.$.endDate": {
    type: String,
    label: "task end date.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  starDate: {
    type: String,
    label: "The date this Requirement was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  endDate: {
    type: String,
    label: "The date this Requirement was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  labels: {
    type: Array,
    label: "Requirement labels"
  },
  "labels.$": {
    type: String,
    label: "Requirement labels"
  }
});

Requirement.attachSchema(Requirement.schema);

export default Requirement;
