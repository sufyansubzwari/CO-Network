import { Meteor } from "meteor/meteor";
import RequirementS from "../../index";
const Query = {};
Query.requirement = (root, { _id }, context) => {
  if (_id) {
    const requirement = RequirementS.collection.findOne(_id);
    console.log(requirement);
    return requirement;
  }
  throw new Error("Missing parameter");
};
Query.searchRequirement = (root, { requirement }, context) => {
  let query = {};
  if (requirement) {
    query = requirement;
  }
  const requirements = RequirementS.collection.find(requirement).fetch();
  console.log(requirements);
  return requirements;
};
Query.requirements = (root, args, context) => {
  const requirements = RequirementS.collection.find({}).fetch();
  console.log(requirements);
  return requirements;
};

export default Query;
