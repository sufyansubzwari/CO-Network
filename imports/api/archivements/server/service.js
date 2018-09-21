import Achievements from "../index";
import * as _ from "lodash";
import Places from "../../places";

/**
 * @class Achievements Service
 * @summary Achievements Service with business logic
 */
class AchievementsService {
  /**
   * @name achievement
   * @summary function for save and update
   * @param {Object} data - Achievement information. If had id then this operation should be an update
   * @return {Object} Achievement
   */
  static achievement = async data => {
    if (_.isUndefined(data._id)) {
      const id = Achievements.collection.insert(data);
      return Achievements.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Achievements.collection.update(id, {$set: data});
      return Achievements.collection.findOne(id);
    }
  };
  /**
   * @name deleteAchievement
   * @summary Allow delete an achievement
   * @param {String} id - Achievement id
   * @return {Object} Achievement deleted
   */
  static deleteAchievement = async (id) => {
    return await Achievements.collection.remove(id);
  };
  /**
   * @name getAchievement
   * @summary Get achievement by id
   * @param {String} _id - Achievement id
   * @return {Object} Achievement
   */
  static getAchievement = _id => {
    return Achievements.collection.findOne(_id);
  };
  /**
   * @name getAchievementByOwner
   * @summary Get achievement by owner
   * @param {String} owner - Achievement owner
   * @return {Object} Achievement
   */
  static getAchievementByOwner = owner => {
    return Achievements.collection.findOne({owner:owner});
  };
  /**
   *@name achievements
   * @summary Get all achievements
   * @param {Object} query - query parameters
   * @param {Number} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all achievements
   */
  static achievements = (query, limit) => {
    return Achievements.collection.find(query, {...limit, sort: {createdAt: -1}}).fetch();
  };
}

export default AchievementsService;
