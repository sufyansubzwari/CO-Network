import Service from "../service";

const Mutation = {};

Mutation.tag = async (root, {tag}, context) => {
  return Service.tag(tag);
};

export default Mutation;
