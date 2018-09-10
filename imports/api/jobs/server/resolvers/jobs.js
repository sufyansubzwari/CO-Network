import Service from "../service";
import Users from "../../../users";
import Tags from "../../../tags";

const Jobs = {};

Jobs.owner = entity => {
  return Users.service.getUser(entity.owner);
};
Jobs.industry = entity => {
  return Tags.service.tags({}, {limit: 1});
};
// Jobs.languages = entity => {
//   return Tags.service.getTags(entity.languages);
// };
export default Jobs;
