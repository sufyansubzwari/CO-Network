import Service from "../service"

const Query = {};

Query.tag = (root, {_id}, context) => {
  return Service.getTag(_id)
};
Query.tags = (root, {tag}, context) => {
  let query = {};
  if (tag) {
    query = tag;
  }
  return Service.tags(query)
};
export default Query;
