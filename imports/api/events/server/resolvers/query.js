import Service from "../service"
import {wrapOperators} from '../../../aux-functions';

const Query = {};

Query.event = (root, {_id}, context) => {
  return Service.getEvent(_id)
};

Query.events = (root, {filter, limit, events}, context) => {
  let query = {};
  if(filter){
    query = {
      "$or": [
        {"title":{"$regex":filter, "$options": "i"}},
        {"description":{"$regex":filter, "$options": "i"}}
      ]
    }
  }
  if(events){
    let newQuery = wrapOperators(events);
    query = newQuery;
  }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.events(query, limitQuery)
};

export default Query;
