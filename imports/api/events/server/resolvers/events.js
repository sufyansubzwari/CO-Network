import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";

const Events = {};

Events.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Events.category = entity => {
  return Tags.service.getTagList(entity.category);
};

export default Events;
