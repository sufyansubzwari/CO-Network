import Service from "../service";

const Mutation = {};

Mutation.job = async (root, {job}, context) => {
  return Service.job(job);
};

Mutation.updateJobsImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteJob = async (root, {_id}, context) => {
  return Service.deleteJob(_id);
};

export default Mutation;
