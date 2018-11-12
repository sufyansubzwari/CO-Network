import Notifications from "../index";
import * as _ from "lodash";
import Followers from "../../followers";
import { messages } from "../constants";
import Users from "../../users";
import { GetCollection } from "../../getCollection";

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
   * @param {String || Object} id - Notification id
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
   * @param {Object} entityId - id of the entity action that trigger the notification
   * @param {Object} entity - entity type that trigger the notification
   * @param {String} userId - user Id that trigger the notification
   * @param {String} title - title of  the notification
   * @return {Object} Notification
   */
  static generateNotification = async (
    action,
    entityId,
    entity,
    userId,
    title,
    applyId
  ) => {
    switch (action) {
      case "POST":
        const userFollowers = await Followers.service.getFollower({
          entityId: userId,
          entity: "USER"
        });
        return NotificationsService.notifyFollowers(
          userFollowers,
          action,
          userId,
          entity,
          title,
          entityId
        );
      case "UPDATE" || "DELETE":
        const entityFollowers = await Followers.service.getFollower({
          entityId: entityId,
          entity: entity
        });
        return NotificationsService.notifyFollowers(
          entityFollowers,
          action,
          userId,
          entity,
          title,
          entityId
        );
      case "FOLLOW":
        return NotificationsService.notifyUser(
          userId,
          action,
          entityId,
          entity,
          "New Follower.",
          entityId
        );
      case "FOLLOW_ENTITY" || "APPLY" || "SPONSOR" || "SPEAKER":
        const collectionService = GetCollection(entity);
        const entityOwner = collectionService.findOne({ _id: userId });
        console.log("entityOwner", entityOwner);
        return NotificationsService.notifyUser(
          entityOwner.owner,
          action,
          entityId,
          applyId ? "JOB-APPLY" : entityOwner.entity,
          entityOwner.title,
          applyId || entityId
        );
      default:
        return null;
    }
  };

  static notifyFollowers = (
    followers,
    action,
    ownerId,
    entity,
    title,
    entityId
  ) => {
    console.log(
      "Action => notifyFollowers",
      followers,
      action,
      ownerId,
      entity,
      title,
      entityId
    );
    if (followers && followers.followers && followers.followers.length) {
      followers.followers.forEach(userId => {
        NotificationsService.notifyUser(
          userId,
          action,
          ownerId,
          entity,
          title,
          entityId
        );
      });
    }
  };

  static notifyUser = (userId, action, ownerId, entity, title, entityId) => {
    console.log(
      "Action => notifyUser",
      userId,
      action,
      ownerId,
      entity,
      title,
      entityId
    );
    const user = Users.service.getUser({ _id: ownerId });
    Notifications.collection.insert({
      action: action,
      owner: userId,
      message: messages(
        action,
        user && user.profile && user.profile.name,
        entity,
        title
      ),
      title: title,
      entityId: entityId,
      entity: entity
    });
  };
}

export default NotificationsService;
