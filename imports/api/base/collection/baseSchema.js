import SimpleSchema from "simpl-schema";

const Schema = {};
Schema.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "The date was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: Date,
    label: "The date  was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  createBy: {
    type: String,
    label: "User action owner"
  },
  updateBy: {
    type: String,
    label: "User action owner"
  },
  meta: {
    type: Array,
    required: false,
    label: "metas"
  },
  "meta.$": {
    type: Object
  },
  "meta.$.key": {
    type: String,
    label: "Key"
  },
  "meta.$.value": {
    type: Number,
    label: "Value"
  },
  "meta.$.label": {
    type: String,
    label: "Display nam"
  },
  "meta.$.type": {
    type: String,
    label: "Note",
    optional: true
  }
});

export default Schema;
