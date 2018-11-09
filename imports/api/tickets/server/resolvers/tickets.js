import Events from "../../../events";
import TicketsSold from "../../../ticketsSold/collection";

const Tickets = {};

Tickets.owner = entity => {
  return Events.service.getEvents(entity.owner);
};

Tickets.sold = entity => {
  const ticketsSold = TicketsSold.find({ ticketId: entity._id }).fetch();
  return ticketsSold.length > 0;
};

export default Tickets;
