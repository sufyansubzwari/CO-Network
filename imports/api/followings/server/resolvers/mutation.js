import Service from "../service";

const Mutation = {};

Mutation.following = async (root, {following}, context) => {
  return Service.following(following);
};

Mutation.deleteFollowing = async (root, {_id}, context) => {
  return Service.deleteFollowing(_id);
};


export default Mutation;
