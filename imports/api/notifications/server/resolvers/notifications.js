import Users from "../../../users";

const Notifications = {};

Notifications.owner = entity => {
  return Users.service.getUser(entity.owner);
};

export default Notifications;
