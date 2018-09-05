import Service from "../service";

const Mutation = {};

Mutation.achievement = async (root, {achievement}, context) => {
  return Service.achievement(achievement);
};

Mutation.deleteAchievement = async (root, {id}, context) => {
  return Service.deleteAchievement(id);
};

export default Mutation;
