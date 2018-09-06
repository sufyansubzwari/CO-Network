import Service from "../service"

const Query = {};

Query.follower = (root, {_id}, context) => {
  return Service.getFollower(_id)
};
Query.followers = (root, {follower}, context) => {
  let query = {};
  if (follower) {
    query = follower;
  }
  return Service.followers(query)
};
export default Query;
