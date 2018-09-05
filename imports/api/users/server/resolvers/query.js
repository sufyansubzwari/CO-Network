import Service from '../service';
const Query = {};

Query.user = (root, { _id }, context) => {
  return Service.getUser(_id)
};

Query.users = (root, {user}, context) => {
  let query = {};
  if (user) {
    query = user;
  }
  return Service.users(query);
};
export default Query;
