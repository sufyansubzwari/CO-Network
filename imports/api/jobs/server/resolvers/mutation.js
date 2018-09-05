import Service from "../service";

const Mutation = {};

Mutation.job = async (root, {event}, context) => {
  return Service.job(event);
};

Mutation.updateJobsImage = async (root, {id, image}, context) => {
  return Service.updateImage(id, image);
};

Mutation.deleteEvent = async (root, {id}, context) => {
  return Service.deleteEvent(id);
};

export default Mutation;
