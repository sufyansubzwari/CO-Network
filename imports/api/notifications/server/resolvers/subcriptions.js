import Service from "../service";
import Messages from "../../../messages/collection";

const Subscription = {};

Subscription.subNotifications = (root, { limit, notifications }, context) => {
  let query = notifications ? { ...notifications } : {};
  let limitQuery = limit ? { limit: limit } : {};
  return Service.notifications(query, limitQuery);
};

Subscription.subNewNotAndMsg = (root, {}, context) => {
  const { userId } = context;
  let not = Service.notifications({ owner: userId, viewed: false }, {}).length;
  let msg = Messages.find({ receptor: userId, read: false }).length;
  return {
    messages: msg,
    notifications: not
  };
};

export default Subscription;
