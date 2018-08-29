import Service from "../service";
const Mutation = {};

Mutation.project = async (root, { project }, context) => {
  return Service.project(project);
};
Mutation.addMemberToProject = async (root, { project_id, use_id }, context) => {
  return Service.addMemberToProject(project_id, use_id);
};

export default Mutation;
