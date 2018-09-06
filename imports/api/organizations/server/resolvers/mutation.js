import Service from "../service";

const Mutation = {};

Mutation.organization = async (root, {entity}, context) => {
  return Service.organization(entity);
};

Mutation.updateImage = async (root, {_id, image, cover}, context) => {
  return Service.updateImage(_id, image, cover);
};

Mutation.deleteOrganization = async (root, {_id}, context) => {
  return Service.deleteOrganization(_id);
};

export default Mutation;
