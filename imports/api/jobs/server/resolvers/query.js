import Service from "../service"

const Query = {};

Query.job = (root, {_id}, context) => {
  return Service.getJob(_id)
};
Query.jobs = (root, {event}, context) => {
  let query = {};
  if (event) {
    query = event;
  }
  return Service.jobs(query)
};
export default Query;
