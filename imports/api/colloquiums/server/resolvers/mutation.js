import Service from "../service";
const Mutation = {};

Mutation.updateColloquiumImage = async (
  root,
  { _id, image, cover },
  context
) => {
  return Service.updateImage(_id, image, cover);
};

Mutation.deleteColloquium = async (root, { _id }, context) => {
  return Service.deleteColloquium(_id);
};

export default Mutation;
