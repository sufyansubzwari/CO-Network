import Service from "../service"

const Query = {};

Query.job = (root, {_id}, context) => {
  return Service.getJob(_id)
};
Query.jobs = (root, {jobs, limit}, context) => {
  let query = jobs || {};
  let limitQuery = {limit: limit} || {};
  return Service.jobs(query, limitQuery)
};
export default Query;
