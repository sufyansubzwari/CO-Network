import { Meteor } from "meteor/meteor";
import Projects from "../../index";

const Mutation = {};

Mutation.saveProject = async (root, { project }, context) => {
  const projectId=Projects.collection.insert(project);
  return Projects.collection.findOne(projectId);
};

export default Mutation;
