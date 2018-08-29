import Service from "../service";

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
export default Project;
