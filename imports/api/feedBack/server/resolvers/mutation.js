import Service from "../service";

const Mutation = {};

Mutation.feedBack = async (root, {feedBack}, context) => {
  return Service.feedBack(feedBack);
};

export default Mutation;
