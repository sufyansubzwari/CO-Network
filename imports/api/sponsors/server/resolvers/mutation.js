import Service from "../service";

const Mutation = {};

Mutation.sponsor = async (root, {sponsors}, context) => {
  let entity = Object.assign({}, sponsors);
  const oldSponsor = sponsors._id ? Service.getSponsor(sponsors._id) : null

  const sponsorInserted = await Service.sponsor(entity);
  return sponsorInserted;
};

Mutation.delSponsor = async (root, {_id}, context) => {
  return await Service.deleteSponsor(_id);
};

export default Mutation;
