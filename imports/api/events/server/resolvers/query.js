import Service from "../service"

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

Query.events = (root, {events, limit}, context) => {
  let query = events || {};
  let limitQuery = limit ? {limit: limit} : {};
  return Service.events(query, limitQuery)
};

export default Query;
