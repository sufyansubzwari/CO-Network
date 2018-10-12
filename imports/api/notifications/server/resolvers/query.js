import Service from "../service";

const Query = {};

Query.notification = (root, { _id }, context) => {
  return Service.getNotification(_id);
};
Query.notifications = (root, { limit, notifications }, context) => {
  let query = notifications ? { ...notifications } : {};
  let limitQuery = limit ? { limit: limit } : {};
  return Service.notifications(query, limitQuery);
};

export default Query;
