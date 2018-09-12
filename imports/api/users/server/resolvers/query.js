import Service from '../service';

const Query = {};

Query.user = (root, {_id}, context) => {
  return _id ? Service.getUser(_id): null
};

Query.users = (root, {user, limit}, context) => {
  let query = user || {};
  let limitQuery = limit || {};
  return Service.users(query, limitQuery);
};
export default Query;
