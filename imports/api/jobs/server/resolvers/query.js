import Service from "../service"
import {wrapOperators} from "../../../aux-functions";

const Query = {};

Query.job = (root, {_id}, context) => {
  return Service.getJob(_id)
};
Query.jobs = (root, {filter, limit, jobs}, context) => {
  let query = {};
  if(filter){
    query = {
      "$or": [
        {"title":{"$regex":filter, "$options": "i"}},
        {"description":{"$regex":filter, "$options": "i"}}
      ]
    }
  }
  if(jobs){
    query = wrapOperators(jobs);
  }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.jobs(query, limitQuery)
};

export default Query;
