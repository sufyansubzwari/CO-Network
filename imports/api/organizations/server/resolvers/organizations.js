import Users from "../../../users";
import Tags from "../../../tags";

const Organizations = {};
const Reason = {};

Organizations.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Reason.industry = () => {
  return Tags.service.tags({}, {limit:2});
};

Organizations.reason = () => {
  return Reason
};

export default Organizations;
