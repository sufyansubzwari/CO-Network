import Service from "../service"

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

//get all the events
Query.events = (root, {event}, context) => {
  let query = {};
  if (event) {
    query = event;
  }
  return Service.events(query)
};
export default Query;
