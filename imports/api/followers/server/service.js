import Followers from "../index";
import Following from "../../followings/index";
import { Meteor } from "meteor/meteor";
import Notifications from "../../notifications";

/**
 * @class FollowersService
 * @summary Followers Service with business logic
 */
class FollowersService {
  /**
   * @name follower
   * @summary function for save and update
   * @param {Object} data - Followers information. If had id then this operation should be an update
   * @param {Object} userId - Logged user id.
   * @return {Object} Followers
   */
  static addFollower = async (data, userId) => {
    if (!userId) {
      throw new Meteor.Error("401", `Unauthorized`);
    }

    try {
      let follow = Followers.collection.findOne(
        { entityId: data.entityId, entity: data.entity },
        { fields: { entityId: 1 } }
      );
      let following = Following.collection.findOne(
        { entityId: userId, entity: data.entity },
        { fields: { entityId: 1 } }
      );

      if (!follow) {
        Followers.collection.insert({
          entityId: data.entityId,
          entity: data.entity,
          followers: [userId]
        });
      } else {
        Followers.collection.update(
          { entityId: data.entityId, entity: data.entity },
          { $addToSet: { followers: userId } }
        );
      }

      if (!following) {
        Following.collection.insert({
          entityId: userId,
          entity: data.entity,
          followings: [data.entityId]
        });
        Notifications.service.generateNotification(data.entity === "USER" ?"FOLLOW" : "FOLLOW_ACTION", userId, data.entity, data.entityId);
      } else {
        Following.collection.update(
          { entityId: userId, entity: data.entity },
          { $addToSet: { followings: data.entityId } }
        );
        Notifications.service.generateNotification(data.entity === "USER" ?"FOLLOW" : "FOLLOW_ACTION", userId, data.entity, data.entityId);
      }
    } catch (exception) {
      throw new Meteor.Error(
        exception.code,
        exception.message || exception.reason
      );
    }
    return data;
  };

  /**
   * @name deleteFollower
   * @summary Allow delete an follower
   * @param {String} id - Follower id
   * @param {Object} userId - Logged user id.
   * @return {Object} Follower deleted
   */
  static deleteFollower = async (id, userId) => {
    if (!userId) {
      throw new Meteor.Error("401", `Unauthorized`);
    }

    try {
      await Followers.collection.update(
        { entityId: id },
        {
          $pull: { followers: userId }
        }
      );

      await Following.collection.update(
        { entityId: userId },
        {
          $pull: { followings: id }
        }
      );
    } catch (exception) {
      throw new Meteor.Error(
        exception.code,
        exception.message || exception.reason
      );
    }
    return id;
  };
  /**
   * @name getFollower
   * @summary Get follower followers by entity
   * @param {Object} query - query parameters
   * @return {Object} Follower
   */
  static getFollower = query => {
    return Followers.collection.findOne(query);
  };
  /**
   *@name followers
   * @summary Get all followers
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all followers
   */
  static followers = query => {
    return Followers.collection.find(query).fetch();
  };
}

export default FollowersService;
