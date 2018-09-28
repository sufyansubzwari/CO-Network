import Service from "../service"
import {wrapOperators} from "../../../aux-functions";

const Query = {};

Query.jobApply = (root, {_id}, context) => {
  return Service.getJobApply(_id)
};
Query.jobsApply = (root, {filter, limit, jobApply}, context) => {
  let query = {};
  if(jobApply){
    query = wrapOperators(jobApply);
  }
  // if(filter){
  //   query = {
  //     "$or": [
  //       {"title":{"$regex":filter, "$options": "i"}},
  //       {"description":{"$regex":filter, "$options": "i"}}
  //     ]
  //   }
  // }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.jobsApply(query, limitQuery)
};

Query.jobApplyCounts = async (root, {field}, context) => {
  return await Service.jobApplyCounts(field);
};

export default Query;
