import Users from "../../../users";

const Bug = {};

Bug.user = owner => {
  return Users.service.getUser(owner);
};

export default Bug;
