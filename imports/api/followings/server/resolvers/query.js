import Service from "../service"

const Query = {};

Query.following = (root, {_id}, context) => {
  return Service.getFollowing(_id)
};
Query.followings = (root, {following}, context) => {
  let query = {};
  if (following) {
    query = following;
  }
  return Service.followings(query)
};
export default Query;
