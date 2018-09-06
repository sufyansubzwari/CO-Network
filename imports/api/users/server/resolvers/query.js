import Service from '../service';

const Query = {};

Query.user = (root, {_id}, context) => {
  return Service.getUser(_id)
};

Query.users = (root, {user, limit}, context) => {
  let query = user || {};
  let limitQuery = limit || {};
  return Service.users(query, limitQuery);
};
export default Query;
