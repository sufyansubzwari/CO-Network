import Service from "../service";
import Users from "../../../users";

const Messages = {};

Messages.from = entity => {
  return Users.service.getUser(entity.from);
};

export default Messages;
