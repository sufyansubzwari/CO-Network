import Service from "../service";
import Tags from "../../../tags";
import Places from "../../../places";
import Sponsors from "../../../sponsors";
import Tickets from "../../../tickets";

const Mutation = {};

Mutation.event = async (root, { events }, context) => {
  let sponsors = events.sponsors;
  let tickets = events.tickets;
  delete events.sponsors;
  delete events.tickets;
  let entity = Object.assign({}, events);
  const oldEvent = events._id ? Service.getEvent(events._id) : null;
  if (events.category)
    entity.category = await Tags.service.normalizeTags(
      events.category,
      oldEvent ? oldEvent.category : []
    );
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
  await Sponsors.service.deleteSponsor({ owner: eventInserted._id });
  //
  if (sponsors && sponsors.length) {
    sponsors.forEach(async spon => {
      if (spon._id) {
        delete spon._id;
      }
      spon.owner = eventInserted._id;
      spon.external = !spon.user;
      await Sponsors.service.sponsor(spon);
    });
  }
  const copyTickets = JSON.parse(JSON.stringify(tickets));

  const dbtickets = Tickets.service.getTicketByOwner(eventInserted._id);

  dbtickets &&
    dbtickets.length &&
    dbtickets.forEach(dbticket => {
      const index = copyTickets.findIndex(
        copyTicket => dbticket._id === copyTicket._id
      );
      if (index === -1) {
        Tickets.service.deleteTicket(dbticket._id);
      }
    });

  if (tickets && tickets.length) {
    tickets.forEach(async ticket => {
      ticket.owner = eventInserted._id;
      await Tickets.service.ticket(ticket);
    });
  }
  return eventInserted;
};

Mutation.updateEventImage = async (root, { _id, image }, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteEvent = async (root, { _id }, context) => {
  return Service.deleteEvent(_id);
};

export default Mutation;
