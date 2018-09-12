import Service from "../service"

const Query = {};

Query.job = (root, {_id}, context) => {
  return Service.getJob(_id)
};
Query.jobs = (root, {filter, limit}, context) => {
  let query = {};
  if(filter){
    query = {
      "$or": [
        {"title":{"$regex":filter, "$options": "i"}},
        {"description":{"$regex":filter, "$options": "i"}}
      ]
    }
  }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.jobs(query, limitQuery)
};

export default Query;
