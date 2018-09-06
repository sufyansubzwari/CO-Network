import Followers from "../index";
import * as _ from "lodash";

/**
 * @class FollowersService
 * @summary Followers Service with business logic
 */
class FollowersService {
  /**
   * @name follower
   * @summary function for save and update
   * @param {Object} data - Followers information. If had id then this operation should be an update
   * @return {Object} Followers
   */
  static follower = async data => {
    if (_.isUndefined(data._id)) {
      const id = Followers.collection.insert(data);
      return Followers.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Followers.collection.update(id, {$set: data});
      return Followers.collection.findOne(id);
    }
  };
  /**
   * @name deleteFollower
   * @summary Allow delete an follower
   * @param {String} id - Follower id
   * @return {Object} Follower deleted
   */
  static deleteFollower = async (id) => {
    return await Followers.collection.remove(id);
  };
  /**
   * @name getFollower
   * @summary Get follower by id
   * @param {String} _id - follower id
   * @return {Object} Follower
   */
  static getFollower = _id => {
    return Followers.collection.findOne(_id);
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
