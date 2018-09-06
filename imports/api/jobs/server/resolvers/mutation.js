import Service from "../service";

const Mutation = {};

Mutation.job = async (root, {event}, context) => {
  return Service.job(event);
};

Mutation.updateJobsImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteJob = async (root, {_id}, context) => {
  return Service.deleteJob(_id);
};

export default Mutation;
