import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";
import { normalizeTagsWithLevels } from "../../../aux-functions";

const Jobs = {};

Jobs.owner = entity => {
  return Users.service.getUser(entity.owner);
};
// Jobs.industry = entity => {
//   return Tags.service.tags({}, {limit: 1});
// };
Jobs.languages = entity => {
  if (entity.languages && entity.languages.length && entity.languages[0].tag) {
    let lang = normalizeTagsWithLevels(entity.languages);
    return lang;
  }
  return Tags.service.tags({ _id: { $in: entity.languages } });
};
Jobs.positionTags = entity => {
  return Tags.service.tags({ _id: { $in: entity.positionTags } });
};

Jobs.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};
export default Jobs;
