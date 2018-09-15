import Service from "../service";
import Tags from '../../../tags';

const Mutation = {};

Mutation.event = async (root, {events}, context) => {
  let entity = await Tags.service.normalizeTags(events);
  console.log(entity);
  return Service.event(entity);
};

Mutation.updateEventImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteEvent = async (root, {_id}, context) => {
  return Service.deleteEvent(_id);
};

export default Mutation;
