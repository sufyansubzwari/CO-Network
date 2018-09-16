import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";

const Jobs = {};

Jobs.owner = entity => {
  return Users.service.getUser(entity.owner);
};
Jobs.industry = entity => {
  return Tags.service.tags({}, {limit: 1});
};
Jobs.languages = entity => {
  return Tags.service.tags({_id: {$in: entity.languages}});
};
Jobs.positionTags = entity => {
  return Tags.service.tags({_id: {$in: entity.positionTags}});
};

Jobs.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};
export default Jobs;
