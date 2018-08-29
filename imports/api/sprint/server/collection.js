import BaseCollection from "../../base/collection";
import SimpleSchema from "simpl-schema";

const Sprint = new BaseCollection("sprints");

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
    label: "The id of the Project."
  },
  name: {
    type: String,
    label: "The title of the Sprint."
  },
  description: {
    type: String,
    label: "Sprint description"
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
  status: {
    type: String,
    allowedValues: ["Open", "Close"],
    label: "Sprint status",
    autoValue() {
      return "Open";
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

Sprint.attachSchema(Sprint.schema);

export default Sprint;
