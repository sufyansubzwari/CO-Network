import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";
import Service from "../service";
import Mutation from "../../../jobs/server/resolvers/mutation";
import { normalizeTagsWithLevels } from '../../../aux-functions';

const Organizations = {};

Organizations.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Organizations.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};

Organizations.description = entity => {
  return Tags.service.getTagList(entity.description);
};

Organizations.tech = entity => {
  if (entity && entity.tech) {
    const tech = entity.tech.stack
      ? { stack: normalizeTagsWithLevels(entity.tech.stack) }
      : {};
    const techInd = entity.tech.industry
      ? { industry: Tags.service.getTagList(entity.tech.industry) }
      : {};
    return Object.assign(entity.tech, tech, techInd);
  }
  return {};
};

Mutation.updateOrgImage = async (root, { _id, image, cover }, context) => {
  return Service.updateImage(_id, image, cover);
};

export default Organizations;
