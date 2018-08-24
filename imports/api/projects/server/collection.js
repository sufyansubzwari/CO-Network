import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Project = new Mongo.Collection("Projects");

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
  owner: {
    type: String,
    label: "The ID of the user this project belongs to."
  },
  createdAt: {
    type: String,
    label: "The date this project was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this project was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The title of the project."
  },
  description: {
    type: String,
    label: "The description of the project."
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
  }
});

Project.attachSchema(Project.schema);

export default Project;
