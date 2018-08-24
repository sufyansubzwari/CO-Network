import { Meteor } from "meteor/meteor";
import { delegateToSchema } from "graphql-tools";
import userSchema from "../../../users/server/types.graphql";
import Tasks from "../../index";
const Query = {};
Query.task = (root, { _id }, context) => {
  if (_id) {
    const task = Tasks.collection.findOne(_id);
    console.log(task);
    return task;
  }
  throw new Error("Missing parameter");
};
Query.searchTask = (root, { task }, context) => {
  let query = {};
  if (task) {
    query = task;
  }
  const tasks = Tasks.collection.find(task).fetch();
  console.log(tasks);
  return tasks;
};
Query.tasks = (root, args, context) => {
  const tasks = Tasks.collection.find({}).fetch();
  console.log(tasks);
  return tasks;
};
Query.assignedUser = (root, args, context, info) => {
  console.log("root", root);
  console.log("context", context);
  console.log("context", info);
  const a = info.mergeInfo.delegateToSchema({
    schema: userSchema,
    operation: "query",
    fieldName: "userBy",
    args: {
      _id: root.assigned
    },
    context,
    info
  });
  console.log("context", a);
  return a;
};

export default Query;
