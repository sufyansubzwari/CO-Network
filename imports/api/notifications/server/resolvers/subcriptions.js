import Service from "../service";

const Subscription = {};

Subscription.subNotifications = (root, { limit, notifications }, context) => {
  let query = notifications ? { ...notifications } : {};
  let limitQuery = limit ? { limit: limit } : {};
  return Service.notifications(query, limitQuery);
};

export default Subscription;
