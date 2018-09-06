import Service from "../service"

const Query = {};

Query.achievement = (root, {_id}, context) => {
  return Service.getAchievement(_id)
};
Query.achievements = (root, {achievement}, context) => {
  let query = {};
  if (achievement) {
    query = achievement;
  }
  return Service.achievements(query)
};
export default Query;
