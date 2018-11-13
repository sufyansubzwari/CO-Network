import Users from "../../../users";
import Organizations from "../../../organizations";
import Tags from "../../../tags";
import Places from "../../../places";
import Followers from "../../../followers";
import Sponsors from "../../../sponsors";
import Tickets from "../../../tickets";

const Events = {};

Events.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Events.organization = entity => {
  return Organizations.service.getOrganization(entity.organization);
};

Events.category = entity => {
  return Tags.service.getTagList(entity.category);
};

Events.tags = entity => {
  return Tags.service.getTagList(entity.tags);
};

Events.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};

Events.sponsors = entity => {
  return Sponsors.service.getSponsorsByOwner(entity._id);
};

Events.tickets = entity => {
  return Tickets.service.getTicketByOwner(entity._id)
}

Events.followerList = entity => {
  const followers = Followers.service.getFollower({
    entityId: entity._id,
    entity: entity.entity
  });
  return (followers && followers.followers) || [];
};

export default Events;
