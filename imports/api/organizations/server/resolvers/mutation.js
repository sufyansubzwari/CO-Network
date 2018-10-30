import Service from "../service";
import Places from "../../../places";
import Tags from "../../../tags";

const Mutation = {};

Mutation.organization = async (root, { organizations }, context) => {
  let entity = Object.assign({}, organizations);
  const oldOrg = organizations._id ? Service.getOrganization(organizations._id) : null;
  if (organizations.description)
    entity.description = await Tags.service.normalizeTags(
      organizations.description,
      oldOrg ? oldOrg.description : []
    );
  if (organizations.tech && organizations.tech.stack)
    entity.tech.stack = await Tags.service.normalizeTagsWithLevels(
      organizations.tech.stack,
      oldOrg && oldOrg.tech && oldOrg.tech.stack && oldOrg.tech.stack.length ? oldOrg.tech.stack : []
    );
  if (organizations.tech && organizations.tech.industry)
    entity.tech.industry = await Tags.service.normalizeTags(
      organizations.tech.industry,
      oldOrg ? oldOrg.tech.industry : []
    );
  const inserted = await Service.organization(entity);
  //inserting location
  if (
    organizations.place &&
    organizations.place.location &&
    organizations.place.location.address
  ) {
    let place = Object.assign({}, organizations.place);
    if (!place._id) {
      place.owner = inserted._id;
      place.entity = "ORGANIZATION";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }
  return inserted;
};

Mutation.updateImage = async (root, { _id, image, cover }, context) => {
  return Service.updateImage(_id, image, cover);
};

Mutation.deleteOrganization = async (root, { _id }, context) => {
  return Service.deleteOrganization(_id);
};

Mutation.updateIdentitiesOrg = (root, { _id, identities }, context) => {
    return Service.updateIdentitiesOrg(_id, identities);
};

Mutation.updateOrgImage = async (root, { _id, image, cover }, context) => {
  return Service.updateImage(_id, image, cover);
};

export default Mutation;
