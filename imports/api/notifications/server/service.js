import Notifications from "../index";
import * as _ from "lodash";
import Followers from "../../followers";
import { messages } from "../constants";
import Users from "../../users";

/**
 * @class Job Service
 * @summary Job Service with business logic
 */
class NotificationsService {
  /**
   * @name notification
   * @summary function for save and update
   * @param {Object} data - Notification information. If had id then this operation should be an update
   * @return {Object} Notification
   */
  static notification = async data => {
    if (_.isUndefined(data._id)) {
      const id = Notifications.collection.insert(data);
      return Notifications.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Notifications.collection.update(id, { $set: data });
      return Notifications.collection.findOne(id);
    }
  };
  /**
   * @name deleteNotification
   * @summary Allow delete an Notification
   * @param {String} id - Notification id
   * @return {Object} Notification deleted
   */
  static deleteNotification = async id => {
    return await Notifications.collection.remove(id);
  };
  /**
   * @name getNotification
   * @summary Get notification by id
   * @param {String || Object} _id - notifications id
   * @return {Object} Return one Notification
   */
  static getNotification = _id => {
    return Notifications.collection.findOne(_id);
  };
  /**
   *@name notifications
   * @summary Get all notifications
   * @param {Object} query - query parameters
   * @param {Object} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all notifications
   */
  static notifications = (query, limit) => {
    return Notifications.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };
  /**
   * @name generateNotification
   * @summary function for save and update
   * @param {String} action - action that trigger the notification
   * @param {Object} entity - title of the action that trigger the notification
   * @param {String} userId - user Id that trigger the notification
   * @param {String} title - title of  the notification
   * @return {Object} Notification
   */
  static generateNotification = async (action, entity, userId, title) => {
    let entityFollowers = Followers.service.getFollower({ entityId: entity._id, entity: entity.entity });
    let userFollowers = Followers.service.getFollower({ entityId: userId, entity: "USER" });

    switch (action) {
      case "POST":
        return this.notifyFollowers(userFollowers, action, entity, title);
      case "UPDATE" || "DELETE":
        return this.notifyFollowers(entityFollowers, action, entity, title);
      case "FOLLOW":
        return this.notifyUser(userId, action, entity, "New Follower.");
      case "FOLLOW_ACTION" || "APPLY" || "SPONSOR" || "SPEAKER":
        return this.notifyUser(userId, action, entity, title);
      default:
        return null;
    }
  };

  static notifyFollowers = (followers, action, entity,title) => {
    if(followers && followers.followers && followers.followers.length) {
      followers.followers.forEach(userId => {
        this.notifyUser(userId, action, entity, title);
      });
    }
  };

  static notifyUser = (userId, action, entity, title) => {
    const user = Users.service.getUser({_id: userId});
    Notifications.collection.insert({
      action: action,
      owner: userId,
      message: messages(action, user.profile.name, entity.entity, title),
      title: title,
      entity: entity
    });
  }
}

export default NotificationsService;
