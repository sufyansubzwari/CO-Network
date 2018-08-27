import Projects from "../../index";

const Mutation = {};

Mutation.saveProject = async (root, { project }, context) => {
  const projectId = Projects.collection.insert(project);
  return Projects.collection.findOne(projectId);
};
Mutation.addMemberToProject = async (root, { project_id, use_id }, context) => {
  await Projects.collection.update(project_id, {
    $addToSet: { members: use_id }
  });
  return await Projects.collection.findOne(project_id);
};

export default Mutation;
