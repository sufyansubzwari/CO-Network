import Service from "../service";

const Mutation = {};

Mutation.event = async (root, {events}, context) => {
  return Service.event(events);
};

Mutation.updateEventImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteEvent = async (root, {_id}, context) => {
  return Service.deleteEvent(_id);
};

export default Mutation;
