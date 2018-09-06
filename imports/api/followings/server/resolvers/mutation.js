import Service from "../service";

const Mutation = {};

Mutation.following = async (root, {following}, context) => {
  return Service.following(following);
};

Mutation.deleteFollowing = async (root, {id}, context) => {
  return Service.deleteFollowing(id);
};


export default Mutation;
