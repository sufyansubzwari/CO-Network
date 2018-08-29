import Service from "../service";
const Mutation = {};

Mutation.requirement = async (root, { requirement }, context) => {
  return Service.project(requirement);
};

export default Mutation;
