import { Meteor } from "meteor/meteor";
import Bugs from "../../index";
const Mutation = {};

Mutation.saveBug= async (root, { bug }, context) => {
  const bugId = Bugs.collection.insert(bug);
  return Bugs.collection.findOne(bugId);
};

export default Mutation;
