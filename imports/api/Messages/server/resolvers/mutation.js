import Service from "../service";

const Mutation = {};

Mutation.message = async (root, {message}, context) => {
  return Service.message(message);
};

Mutation.markAsRead = async (root, {id}, context) => {
  return Service.markAsRead(id);
};

Mutation.deleteMessage = async (root, {id}, context) => {
  return Service.deleteMessage(id);
};


export default Mutation;
