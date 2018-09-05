import Service from "../service";

const Mutation = {};

Mutation.organization = async (root, {entity}, context) => {
  return Service.organization(entity);
};

Mutation.updateImage = async (root, {id, image, cover}, context) => {
  return Service.updateImage(id, image, cover);
};

Mutation.deleteOrganization = async (root, {id}, context) => {
  return Service.deleteOrganization(id);
};

export default Mutation;
