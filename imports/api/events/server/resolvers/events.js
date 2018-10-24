import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";
import Followers from "../../../followers";
import Sponsors from "../../../sponsors";

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

Events.sponsors = entity => {
  return Sponsors.service.getSponsorsByOwner(entity._id)
}

Events.followerList = entity => {
  const followers = Followers.service.getFollower({ entityId: entity._id, entity: entity.entity });
  return (followers && followers.followers) || [];
};
export default Events;
