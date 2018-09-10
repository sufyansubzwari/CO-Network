import Service from "../service"

const Query = {};

Query.place = (root, {_id}, context) => {
  return Service.getPlace(_id)
};
Query.places = (root, {places, limit}, context) => {
  let query = places || {};
  let limitQuery = {limit: limit} || {};
  return Service.places(query, limitQuery)
};
export default Query;
