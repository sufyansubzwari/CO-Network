import { Meteor } from "meteor/meteor";
import Notifications from "../../collection";

Meteor.publish("notifications.myNotifications", () => {
  const userId = Meteor.userId();
  return Notifications.find({ owner: userId, viewed: false });
});
