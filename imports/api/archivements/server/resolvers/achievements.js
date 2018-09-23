import Users from "../../../users";
import Tags from "../../../tags";

const Achievement = {};

Achievement.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Achievement.category = entity => {
  return entity.category ? Tags.service.tags({_id: {$in: entity.category}}) : [];
};

export default Achievement;
