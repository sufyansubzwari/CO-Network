import Service from "../service";

const Query = {};
Query.requirement = (root, { _id }, context) => {
 return Service.getRequirement(_id)
};
Query.requirements = (root, {requirement}, context) => {
  let query = {};
  if (requirement) {
    query = requirement;
  }
  return Service.requirements(query);
};

export default Query;
