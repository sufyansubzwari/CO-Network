import Service from "../service"

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

Query.events = (root, {event, limit}, context) => {
  let query = event || {};
  let limitQuery = limit || {};
  return Service.events(query, limitQuery)
};

export default Query;
