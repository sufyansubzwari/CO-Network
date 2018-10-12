import Service from "../service";

const Mutation = {};

Mutation.notification = async (root, { job }, context) => {
  return await Service.notification(job);
};

Mutation.deleteNotification = async (root, { _id }, context) => {
  return Service.deleteNotification(_id);
};

export default Mutation;
