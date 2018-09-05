import Users from "../../../users";

const Organizations = {};

Organizations.owner = entity => {
  return Users.service.getUser(entity.owner);
};
export default Organizations;
