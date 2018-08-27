import { Meteor } from "meteor/meteor";
import Tasks from "../../index";
const Query = {};
Query.task = (root, { _id }, context) => {
  if (_id) {
    const task = Tasks.collection.findOne(_id);
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

  return tasks;
};
Query.tasks = (root, args, context) => {
  const tasks = Tasks.collection.find({}).fetch();
  return tasks;
};
Query.taskByProject = (root, { project_id }, context) => {
  const tasks = Tasks.collection.find({ project_id: project_id }).fetch();
  return tasks;
};

export default Query;
