import Service from "../service"
import {wrapOperators} from '../../../aux-functions';
import Places from '../../../places'
import Followings from "../../../followings/server/service";

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

Query.events = (root, {filter, limit, events}, context) => {
  let query = {};
  if (events) {

    if (events.location) {
      let loc = Places.service.matchLocations(events.location, events.locationRange);
      events["_id"] = {"$in": loc.map(item => item.owner)};
      delete events.location;
      delete events.locationRange;
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

Query.myEvents = async (root, { owner }, context) => {
  const myEvents = await Service.events({ owner: owner }, {fields: {_id: 1 }}).map(item => item._id);
  const followings = await Followings.getFollowing(
    { entityId: owner, entity: "EVENT" },
    { fields: { followings: 1 } }
  );
  return {
    myEvents,
    followings: followings && followings.followings ? followings.followings : []
  };
};

export default Query;
