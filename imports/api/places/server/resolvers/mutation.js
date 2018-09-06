import Service from "../service";

const Mutation = {};

Mutation.place = async (root, {places}, context) => {
  return Service.place(places);
};

Mutation.deletePlace = async (root, {_id}, context) => {
  return Service.deletePlace(_id);
};


export default Mutation;
