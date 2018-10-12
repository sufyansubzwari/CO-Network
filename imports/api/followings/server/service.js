import Followings from "../index";
import * as _ from "lodash";
import Notifications from "../../notifications";

/**
 * @class FollowingsService
 * @summary Followings Service with business logic
 */
class FollowingsService {
  /**
   * @name following
   * @summary function for save and update
   * @param {Object} data - Followings information. If had id then this operation should be an update
   * @return {Object} Followings
   */
  static following = async data => {
    if (_.isUndefined(data._id)) {
      const id = Followings.collection.insert(data);
      Notifications.service.generateNotification();
      return Followings.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Followings.collection.update(id, {$set: data});
      return Followings.collection.findOne(id);
    }
  };
  /**
   * @name deleteFollowing
   * @summary Allow delete an following
   * @param {String} id - Following id
   * @return {Object} Following deleted
   */
  static deleteFollowing = async (id) => {
    return await Followings.collection.remove(id);
  };
  /**
   * @name getFollowing
   * @summary Get following by id
   * @param {Object} _id - following id
   * @return {Object} Followings
   */
  static getFollowing = _id => {
    return Followings.collection.findOne(_id);
  };
  /**
   *@name followings
   * @summary Get all followings
   * @param {Object} query - query parameters
   * @param {Object} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all following
   */
  static followings = (query, limit) => {
    return Followings.collection.find(query, limit).fetch();
  };
}

export default FollowingsService;
