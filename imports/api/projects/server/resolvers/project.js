import Service from "../service";
import Users from "../../../users";

const Project = {};

Project.members = project => {
  return Service.members(project._id);
};
Project.sprints = project => {
  return Service.sprints(project._id);
};
Project.requirements = project => {
  return Service.requirements(project._id);
};
Project.tasks = project => {
  return Service.tasks(project._id);
};
Project.owner = project => {
  return Users.service.getUser(project.owner);
};
Project.report = project => {
  const object={
    totalPlannedHours: Service.totalPlannedHours(project._id),
    totalLoggedHours: Service.totalLoggedHours(project._id),
    currentSprint: Service.currentSprint(project._id),
    progress: Service.progress(project._id),
  }
  return object
};
export default Project;
