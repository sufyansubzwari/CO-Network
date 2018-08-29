import BaseCollection from "../base/collection";
import SimpleSchema from "simpl-schema";

const Project = new BaseCollection("Projects");

Project.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Project.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
/**
 * @summary Project Collection had sprint collection embed
 * */
Project.schema = new SimpleSchema({
  name: {
    type: String,
    label: "The title of the project."
  },
  description: {
    type: String,
    label: "The description of the project."
  },
  members: {
    type: Array,
    required: false,
    label: "Assign history"
  },
  "members.$": {
    type: String
  },
  sprints: {
    type: Array,
    required: false,
    label: "Assign history"
  },
  "sprints.$": {
    type: Object
  },
  "sprints.$._id": {
    type: String,
    label: "Sprint id"
  },
  "sprints.$.name": {
    type: String,
    label: "Sprint name"
  },
  "sprints.$.description": {
    type: String,
    label: "Sprint description"
  },
  "sprints.$.status": {
    type: String,
    allowedValues: ["Open", "Close"],
    label: "Sprint status"
  },
  "sprints.$.labels": {
    type: Array,
    label: "Sprint labels"
  },
  "sprints.$.labels.$": {
    type: String,
    label: "Sprint labels"
  },
  "sprints.$.starDate": {
    type: String,
    label: "Sprint start date.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  "sprints.$.endDate": {
    type: String,
    label: "Sprint end date.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  starDate: {
    type: String,
    label: "The date this project was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  endDate: {
    type: String,
    label: "The date this project was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  labels: {
    type: Array,
    label: "Project labels"
  },
  "labels.$": {
    type: String,
    label: "Project labels"
  }
});

Project.attachSchema(Project.schema);

export default Project;
