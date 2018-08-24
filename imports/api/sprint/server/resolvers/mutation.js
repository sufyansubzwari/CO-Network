import { Meteor } from "meteor/meteor";
import Sprints from "../../index";

const Mutation = {};

Mutation.saveSprint = async (root, { sprint }, context) => {
  const sprintId=Sprints.collection.insert(sprint);
  return Sprints.collection.findOne(sprintId);
};

export default Mutation;
