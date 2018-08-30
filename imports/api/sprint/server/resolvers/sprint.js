import Service from "../service";
import Requirement from '../../../requirements/server/resolvers/requirement';
const Sprint = {};
Sprint.activeUsers = sprint => {
  return Service.activeUsers(sprint._id);
};
Sprint.report = sprint => {
  const object={
    totalPlannedHours: Service.totalPlannedHours(sprint._id),
    totalLoggedHours: Service.totalLoggedHours(sprint._id),
    progress: Service.progress(sprint._id),
  }
  return object
};
Sprint.tasks = sprint => {
  return Service.tasks(sprint._id);
};
export default Sprint;
