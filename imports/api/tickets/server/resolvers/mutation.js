import Service from "../service";
import Tags from "../../../tags";

const Mutation = {};

Mutation.ticket = async (root, {ticket}, context) => {
  let entity = Object.assign({}, ticket);;
  return await Service.ticket(entity);
};

Mutation.deleteTicket = async (root, {id}, context) => {
  return Service.deleteTicket(id);
};

export default Mutation;
