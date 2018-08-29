import Service from "../service";

const Project = {};

Project.members = async project => {
  return Service.members(project._id);
};
Project.tasks = async project => {
  return await Task.collection.find({ project_id: project._id }).fetch();
};
export default Project;
