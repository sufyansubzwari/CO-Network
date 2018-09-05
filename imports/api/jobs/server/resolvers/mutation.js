import Service from "../service";

const Mutation = {};

Mutation.event = async (root, {event}, context) => {
  return Service.event(event);
};

Mutation.updateJobsImage = async (root, {id, image}, context) => {
  return Service.updateImage(id, image);
};

Mutation.deleteEvent = async (root, {id}, context) => {
  return Service.deleteEvent(id);
};

export default Mutation;
