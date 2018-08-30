import Service from "../service";
const Mutation = {};

Mutation.requirement = async (root, { requirement }, context) => {
  return Service.requirement(requirement);
};

export default Mutation;
