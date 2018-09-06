import Service from "../service";

const Mutation = {};

Mutation.message = async (root, {message}, context) => {
  return Service.message(message);
};

Mutation.markAsRead = async (root, {_id}, context) => {
  return Service.markAsRead(_id);
};

Mutation.deleteMessage = async (root, {_id}, context) => {
  return Service.deleteMessage(_id);
};


export default Mutation;
