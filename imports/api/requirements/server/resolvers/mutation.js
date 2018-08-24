import { Meteor } from "meteor/meteor";
import Requirements from "../../index";

const Mutation = {};

Mutation.saveRequirement = async (root, { requirement }, context) => {
  const requirementId = Requirements.collection.insert(requirement);
  return Requirements.collection.findOne(requirementId);
};

export default Mutation;
