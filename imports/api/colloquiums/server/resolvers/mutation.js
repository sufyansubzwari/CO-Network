import Service from "../service";
import Tags from "../../../tags";
import Places from "../../../places";
const Mutation = {};

Mutation.colloquium = async (root, { colloquium }, context) => {
  let entity = Object.assign({}, colloquium);
  let oldColloquium = colloquium._id
    ? Service.getColloquium(colloquium._id)
    : null;
  if (colloquium.tags)
    entity.tags = await Tags.service.normalizeTags(
      colloquium.tags,
      oldColloquium ? oldColloquium.tags : []
    );
  const inserted = await Service.colloquium(entity);
  //inserting location
  if (
    colloquium.place &&
    colloquium.place.location &&
    colloquium.place.location.address
  ) {
    let place = Object.assign({}, colloquium.place);
    if (!place._id) {
      place.owner = inserted._id;
      place.entity = "COLLOQUIUM";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }
  return inserted;
};

Mutation.updateColloquiumImage = async (
  root,
  { _id, image, cover },
  context
) => {
  return Service.updateImage(_id, image, cover);
};

Mutation.deleteColloquium = async (root, { _id }, context) => {
  return Service.deleteColloquium(_id);
};

export default Mutation;
