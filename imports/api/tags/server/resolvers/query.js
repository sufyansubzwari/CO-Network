import Service from "../service"

const Query = {};

Query.tag = (root, {_id}, context) => {
  return Service.getTag(_id)
};
Query.tags = (root, {tags, limit}, context) => {
  let query = tags || {};
  let limitQuery = limit ? {limit: limit} : {};
  return Service.tags(query, limitQuery).sort((a, b) => b.used - a.used)
};
export default Query;
