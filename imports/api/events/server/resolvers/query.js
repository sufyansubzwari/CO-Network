import Service from "../service"

const Query = {};

Query.event = (root, {_id}, context) => {
  console.log(_id);
  return Service.getEvent(_id)
};
Query.events = (root, {event}, context) => {
  let query = {};
  if (event) {
    query = event;
  }
  return Service.events(query)
};
export default Query;
