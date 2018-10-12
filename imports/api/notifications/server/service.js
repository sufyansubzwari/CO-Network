import Notifications from "../index";
import * as _ from "lodash";

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
}

export default NotificationsService;
