import Service from "../service";
import Users from "../../../users";

const Jobs = {};

Jobs.owner = entity => {
  return Users.service.getUser(entity.owner);
};
Jobs.owner = entity => {
  return Users.service.getUser(entity.owner);
};
export default Jobs;
