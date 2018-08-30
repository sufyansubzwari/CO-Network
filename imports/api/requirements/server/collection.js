import BaseCollection from "../../base/collection";
import SimpleSchema from "simpl-schema";

const Requirement = new BaseCollection("requirements");

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
  sprint_id: {
    type: String,
    label: "The ID of the sprint this Requirement belongs to."
  },
  project_id: {
    type: String,
    label: "The ID of the project this Requirement belongs to."
  },
  name: {
    type: String,
    label: "The title of the Requirement."
  },
  description: {
    type: String,
    label: "The description of the Requirement."
  },
  status: {
    type: String,
    optional:true,
    label: "Priority"
  },
  priority: {
    type: String,
    optional:true,
    allowedValues: ["Critical","High","Low","Nice to have"],
    label: "Priority"
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
    optional:true,
    label: "Requirement labels"
  },
  "labels.$": {
    type: String,
    label: "Requirement labels"
  }
});

Requirement.attachSchema(Requirement.schema);

export default Requirement;
