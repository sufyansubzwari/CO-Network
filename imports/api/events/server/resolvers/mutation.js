import Service from "../service";
import Tags from '../../../tags';
import Places from '../../../places';

const Mutation = {};

Mutation.event = async (root, {events}, context) => {
  let entity = Object.assign({}, events);
  if (events.category)
    entity.category = await Tags.service.normalizeTags(events.category);
  const eventInserted = await Service.event(entity);
  //inserting location
  if (events.place && events.place.location && events.place.location.address) {
    let place = Object.assign({}, events.place);
    if (!place._id) {
      place.owner = eventInserted._id;
      place.entity = "EVENT";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }
  return eventInserted;
};

Mutation.updateEventImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteEvent = async (root, {_id}, context) => {
  return Service.deleteEvent(_id);
};

export default Mutation;
