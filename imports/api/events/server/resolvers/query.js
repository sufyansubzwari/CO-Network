import Service from "../service"
import {wrapOperators} from '../../../aux-functions';
import Places from '../../../places'

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

Query.events = (root, {filter, limit, events}, context) => {
  let query = {};
  if (events) {

    if (events.location) {
      console.log(events.location.map(item => item.address));
      let loc = Places.service.places({'location.address': {"$in": events.location.map(item => item.address)}});
      events["_id"] = {"$in": loc.map(item => item.owner)};
      delete events.location;
    }
    query = wrapOperators(events);
    // console.log(query);
  }
  if (filter) {
    query["$or"] = [
      {"title": {"$regex": filter, "$options": "i"}},
      {"description": {"$regex": filter, "$options": "i"}}
    ]
  }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.events(query, limitQuery)
};

export default Query;
