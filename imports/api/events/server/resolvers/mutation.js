import Service from "../service";
import Tags from '../../../tags';
import Places from '../../../places';
import Sponsors from "../../../sponsors";

const Mutation = {};

Mutation.event = async (root, {events}, context) => {
  let sponsors = events.sponsors;
  delete events.sponsors;
  let entity = Object.assign({}, events);
  const oldEvent = events._id ? Service.getEvent(events._id) : null
  if (events.category)
    entity.category = await Tags.service.normalizeTags(events.category, oldEvent ? oldEvent.category : []);
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

  await Sponsors.service.deleteSponsor({owner: eventInserted._id })
  if(sponsors && sponsors.length){
    for(let i = 0; i < sponsors.length; i++){
        let sponsor = sponsors[i];
        // if(!sponsor._id){
          sponsor.owner = eventInserted._id;
          sponsor.external = !sponsor.user;
        // }
        console.log(sponsor)
        Sponsors.service.sponsor(sponsor)
      }
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
