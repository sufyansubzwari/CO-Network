import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Sprint = new Mongo.Collection("Sprint");

Sprint.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Sprint.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Sprint.schema = new SimpleSchema({
  project_id: {
    type: String,
    label: "The ID of the project this Sprint belongs to."
  },
  createdAt: {
    type: String,
    label: "The date this Sprint was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: "The date this Sprint was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The title of the Sprint."
  },
    starDate: {
    type: String,
    label: "The date this Sprint was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  endDate: {
    type: String,
    label: "The date this Sprint was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  status:{
    type: String,
    required:false,
    autoValue() {
      if (this.isInsert) return "New";
    }
  },flag:{
    type: String,
    required:false,
    autoValue() {
      if (this.isInsert) return "external";
    }
  }
});

Sprint.attachSchema(Sprint.schema);

export default Sprint;
