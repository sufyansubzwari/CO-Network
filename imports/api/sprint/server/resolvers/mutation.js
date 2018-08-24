import { Meteor } from "meteor/meteor";
import Sprints from "../../index";

const Mutation = {};

Mutation.saveSprint = async (root, { project }, context) => {
  const projectId=Sprints.collection.insert(project);
  return Sprints.collection.findOne(projectId);
};

export default Mutation;
