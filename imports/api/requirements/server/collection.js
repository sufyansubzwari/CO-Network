import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Requirement = new Mongo.Collection("Requirement");

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

Requirement.schema = new SimpleSchema({
  project_id: {
    type: String,
    label: "The ID of the project this Requirement belongs to."
  },
  sprint_id: {
    type: String,
    label: "The ID of the sprint this Requirement belongs to."
  },
  createdAt: {
    type: String,
    label: "The date this Requirement was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this Requirement was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The title of the Requirement."
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
  }
});

Requirement.attachSchema(Requirement.schema);

export default Requirement;
