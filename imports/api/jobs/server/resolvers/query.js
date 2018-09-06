import Service from "../service"

const Query = {};

Query.job = (root, {_id}, context) => {
  return Service.getJob(_id)
};
Query.jobs = (root, {event, limit}, context) => {
  let query = event || {};
  let limitQuery = limit || {};
  return Service.jobs(query, limitQuery)
};
export default Query;
