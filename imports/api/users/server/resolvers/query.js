import Service from '../service';
const Query = {};

Query.user = (root, { _id }, context) => {
  return Service.getUser(_id)
};

Query.users = (root, {task}, context) => {
  let query = {};
  if (task) {
    query = task;
  }
  return Service.users(query);
};
export default Query;
