import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";

const Events = {};

Events.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Events.category = () => {
  return Tags.service.tags({}, {limit: 1});
};

export default Events;
