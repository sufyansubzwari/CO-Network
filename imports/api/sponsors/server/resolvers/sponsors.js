import Users from "../../../users";
import Organizations from "../../../organizations";

const Sponsors = {};

Sponsors.user = entity => {
  return Users.service.getUser(entity.user);
};

Sponsors.organization = entity => {
  return Organizations.service.getOrganization(entity.organization);
};

export default Sponsors;
