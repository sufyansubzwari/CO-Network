import Service from "../service";

const Mutation = {};

Mutation.events = async (root, {events}, context) => {
  return Service.events(events);
};

export default Mutation;
