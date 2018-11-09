import Service from "../service"

const Query = {};

Query.ticket = (root, {_id}, context) => {
  return Service.getTicket(_id)
};
Query.tickets = (root, {tickets}, context) => {
  let query = {};
  console.log(tickets)
  if (tickets) {
    query = tickets;
  }
  return Service.tickets(query);
};
export default Query;
