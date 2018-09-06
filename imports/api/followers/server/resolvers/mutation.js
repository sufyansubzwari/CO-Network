import Service from "../service";

const Mutation = {};

Mutation.follower = async (root, {follower}, context) => {
  return Service.follower(follower);
};

Mutation.deleteFollower = async (root, {_id}, context) => {
  return Service.deleteFollower(_id);
};


export default Mutation;
