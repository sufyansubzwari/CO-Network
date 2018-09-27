import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";
import Service from "../service";
import Mutation from "../../../jobs/server/resolvers/mutation";

const Colloquiums = {};

Colloquiums.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Colloquiums.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};

Colloquiums.tags = entity => {
  return Tags.service.getTagList(entity.tags);
};

Mutation.updateImage = async (root, { _id, image }, context) => {
  return Service.updateImage(_id, image);
};

export default Colloquiums;
