import Service from "../service";

const Mutation = {};

Mutation.followAction = async (root, { follower, follow, id }, context) => {
  const { userId } = context;
  if (!follow) return Service.addFollower(follower, userId);
  else return Service.deleteFollower(id, userId);
};

export default Mutation;
