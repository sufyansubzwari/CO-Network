import BaseCollection from "../../base/collection";
import SimpleSchema from "simpl-schema";

const Project = new BaseCollection("projects");

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
  },owner: {
    type: String,
    label: "The ID of the project on this Bug."
  },
  type: {
    type: String,
    label: "Project type"
  },
  customer: {
    type: String,
    label: "Project customer"
  },
});

Project.attachSchema(Project.schema);

export default Project;
