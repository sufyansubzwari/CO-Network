import Service from "../service";

const Mutation = {};

Mutation.notification = async (root, { notification }, context) => {
  return await Service.notification(notification);
};

Mutation.deleteNotification = async (root, { _id }, context) => {
  return Service.deleteNotification(_id);
};

export default Mutation;
