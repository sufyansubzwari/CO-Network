import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";

const Events = {};

Events.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Events.category = entity => {
  return Tags.service.getTagList(entity.category);
};

Events.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};
export default Events;
