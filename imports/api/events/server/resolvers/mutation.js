import Service from "../service";

const Mutation = {};

Mutation.event = async (root, {events}, context) => {
  return Service.event(events);
};

Mutation.updateEventImage = async (root, {id, image}, context) => {
  return Service.updateImage(id, image);
};

Mutation.deleteEvent = async (root, {id}, context) => {
  return Service.deleteEvent(id);
};

export default Mutation;
