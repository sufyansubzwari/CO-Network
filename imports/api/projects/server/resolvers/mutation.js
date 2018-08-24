import { Meteor } from "meteor/meteor";
import Projects from "../../index";

const Mutation = {};

Mutation.saveProject = async (root, { project }, context) => {
  project.owner = "";
  const projectId=Projects.collection.insert(project);
  return projectId
};

export default Mutation;
