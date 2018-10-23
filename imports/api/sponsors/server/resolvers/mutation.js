import Service from "../service";

const Mutation = {};

Mutation.sponsor = async (root, {sponsors}, context) => {
  let entity = Object.assign({}, sponsors);
  const oldSponsor = sponsors._id ? Service.getSponsor(sponsors._id) : null

  const sponsorInserted = await Service.sponsor(entity);
  return sponsorInserted;
};

Mutation.deleteSponsor = async (root, {_id}, context) => {
  return Service.deleteSponsor(_id);
};

export default Mutation;
