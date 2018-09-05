import Service from "../service"

const Query = {};

Query.feedBack = (root, {_id}, context) => {
  return Service.getFeedBack(_id)
};
Query.feedBacks = (root, {feedBack}, context) => {
  let query = {};
  if (feedBack) {
    query = feedBack;
  }
  return Service.feedBacks(query)
};
export default Query;
