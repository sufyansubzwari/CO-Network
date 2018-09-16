import Users from "../../../users";
import Tags from "../../../tags";
import Places from "../../../places";

const Organizations = {};

Organizations.owner = entity => {
  return Users.service.getUser(entity.owner);
};

Organizations.place = entity => {
  return Places.service.getPlaceByOwner(entity._id);
};

Organizations.info = entity => {
  const info = {description: Tags.service.getTagList(entity.info.description)};
  return Object.assign(entity.info, info);

};
Organizations.tech = entity => {
  const tech = {stack: Tags.service.getTagList(entity.tech.stack)};
  return Object.assign(entity.tech, tech);
};

export default Organizations;
