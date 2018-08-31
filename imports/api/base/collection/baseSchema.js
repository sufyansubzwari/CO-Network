const Schema={
  createdAt: {
    type: Date,
    label: "The date was created.",
    autoValue() {
      if (this.isInsert) return new Date();
    }
  },
  updatedAt: {
    type: Date,
    label: "The date  was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date();
    }
  },
  createBy: {
    type: String,
    optional: true,
    label: "User action owner"
  },
  updateBy: {
    type: String,
    optional: true,
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
};

export default Schema;
