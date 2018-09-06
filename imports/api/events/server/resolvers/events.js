import Service from "../service";
import Users from "../../../users";

const Events = {};

Events.owner = entity => {
  return Users.service.getUser(entity.owner);
};

export default Events;
