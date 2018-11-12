import User from "./users/server/collection";
import Colloquiums from "./colloquiums/server/collection";
import Jobs from "./jobs/server/collection";
import Events from "./events/server/collection";
import Org from "./organizations/server/collection";

const GetCollection = entity => {
  if (entity)
    switch (entity) {
      case "USER":
        return User;
      case "JOB":
        return Jobs;
      case "EVENT":
        return Events;
      case "ORGANIZATION":
        return Org;
      case "COLLOQUIUM":
        return Colloquiums;
    }
  return User;
};

export { GetCollection };
