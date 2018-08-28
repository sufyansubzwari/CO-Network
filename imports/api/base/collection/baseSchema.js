import SimpleSchema from "simpl-schema";

const Schema = {};
Schema.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: "The date was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },

  updatedAt: {
    type: String,
    label: "The date  was last updated.",
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  owner: {
    type: String,
    label: "The ID of the project on this Bug."
  }
});

export default Schema;
