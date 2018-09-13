import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places/server/service";

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
Jobs.location = entity => {
  return Places.getPlace({owner: entity._id});
};
export default Jobs;
