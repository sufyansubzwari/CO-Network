import Service from "../service";
import Users from "../../../users";
import Events from "../../../events";
import Jobs from "../../../jobs";
import Organizations from "../../../organizations";

const Places = {};

Places.owner = (entity) => {
  if (entity.entity === "USER")
    return Users.service.getUser(entity.owner);
  else if (entity.entity === "EVENT")
    return Events.service.getEvent(entity.owner);
  else if (entity.entity === "JOB")
    return Jobs.service.getJob(entity.owner);
  else if (entity.entity === "ORGANIZATION")
    return Organizations.service.getOrganization(entity.owner);
};

export default Places;
