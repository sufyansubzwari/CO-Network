import Service from "../service"
const Query = {};
Query.task = (root, { _id }, context) => {
  return Service.getTask(id)
};

Query.tasks = (root, {task}, context) => {
  let query = {};
  if (task) {
    query = task;
  }
  return Service.tasks(query);
};

export default Query;
