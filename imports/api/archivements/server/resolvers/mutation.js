import Service from "../service";
import Tags from "../../../tags";

const Mutation = {};

Mutation.achievement = async (root, {achievement}, context) => {
  let entity = Object.assign({}, achievement);
  if (achievement.category)
    entity.category = await Tags.service.normalizeTags(achievement.category);
  console.log(achievement.category);
  console.log(entity);
  return await Service.achievement(entity);
};

Mutation.deleteAchievement = async (root, {id}, context) => {
  return Service.deleteAchievement(id);
};

export default Mutation;
