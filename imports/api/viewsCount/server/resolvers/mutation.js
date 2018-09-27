import Service from "../service";

const Mutation = {};

Mutation.viewUpdate = async (root, {view}, context) => {
  return Service.viewUpdate(view);
};

export default Mutation;
