import FeedBack from "../index";
import * as _ from "lodash";
// import {HTTP} from "meteor/http";
// Future = Npm.require('fibers/future');

/**
 * @class FeedBack Service
 * @summary FeedBack Service with business logic
 */
class FeedBackService {
  /**
   * @name feedBack
   * @summary function for save and update
   * @param {Object} data - feedBack information. If had id then this operation should be an update
   * @return {Object} feedBack
   */
  static feedBack = async data => {
    if (_.isUndefined(data._id)) {
      const id = FeedBack.collection.insert(data);
      return FeedBack.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await FeedBack.collection.update(id, {$set: data});
      return FeedBack.collection.findOne(id);
    }
  };
  /**
   * @name getFeedBack
   * @summary Get feedBack by id
   * @param {String} _id - FeedBack id
   * @return {Object} FeedBack
   */
  static getFeedBack = _id => {
    return FeedBack.collection.findOne(_id);
  };
  /**
   *@name feedBacks
   * @summary Get all feedback
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all feedBacks
   */
  static feedBacks = query => {
    return FeedBack.collection.find(query).fetch();
  };
}

export default FeedBackService;
