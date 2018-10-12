import Service from "../service";

const Mutation = {};

Mutation.viewUpdate = async (root, {view}, context) => {
  const res = await Service.viewUpdate(view);
  return (res && res._id) || null;
};

export default Mutation;
