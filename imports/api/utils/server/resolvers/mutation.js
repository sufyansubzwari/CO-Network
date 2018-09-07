import Service from "../service";

const Mutation = {};

Mutation.resourceUpload = async (root, {body, content, path}, context) => {
  return Service.resourceUpload(body, content, path);
};

export default Mutation;
