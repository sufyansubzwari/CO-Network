import Service from "../service";

const Mutation = {};

Mutation.follower = async (root, {follower}, context) => {
  return Service.follower(follower);
};

Mutation.deleteFollower = async (root, {id}, context) => {
  return Service.deleteFollower(id);
};


export default Mutation;
