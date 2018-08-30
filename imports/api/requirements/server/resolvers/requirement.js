import Service from "../service";
import Project from '../../../projects/server/resolvers/project';
const Requirement = {};
Requirement.status =  requirement => {
  return Service.status(requirement._id);
};
Requirement.report = requirement => {
  const object={
    totalPlannedHours: Service.totalPlannedHours(requirement._id),
    totalLoggedHours: Service.totalLoggedHours(requirement._id),
    progress: Service.progress(requirement._id),
  }
  return object
};
Requirement.tasks = requirement => {
  return Service.tasks(requirement._id);
};

export default Requirement;
