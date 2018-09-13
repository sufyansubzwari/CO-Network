import Service from '../service';

const Query = {};

Query.user = (root, {id}, context) => {
  return id ? Service.getUser(id): null
};

Query.users = (root, {user, limit}, context) => {
  let query = user || {};
  let limitQuery = limit || {};
  return Service.users(query, limitQuery);
};
export default Query;
