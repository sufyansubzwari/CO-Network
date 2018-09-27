import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Colloquiums = new Mongo.Collection("Colloquiums");

Colloquiums.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Colloquiums.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Colloquiums.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The ID of the user this document belongs to."
  },
  createdAt: {
    type: Date,
    label: "The date this document was created.",
    autoValue() {
      if (this.isInsert) return new Date();
    }
  },
  updatedAt: {
    type: Date,
    label: "The date this document was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    }
  },
  entity: {
    type: String,
    label: "Name of the entity",
    defaultValue: "COLLOQUIUM"
  },
  image: { type: String, optional: true },
  name: { type: String, optional: true },
  description: { type: String, optional: true },
  competence: { type: Array, optional: true },
  "competence.$": { type: Object, optional: true },
  "competence.$.label": { type: String, optional: true },
  tags: {
    type: Array,
    optional: true
  },
  "tags.$": {
    type: String,
    label: "The tag of the colloquium.",
    optional: true
  },
  views: {
    type: Number,
    label: "Viewed Count",
    optional: true,
    defaultValue: 0
  }
});

Colloquiums.attachSchema(Colloquiums.schema);

export default Colloquiums;
