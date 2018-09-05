import Tags from "../index";
import * as _ from "lodash";

/**
 * @class Tags Service
 * @summary Tags Service with business logic
 */
class TagsService {
  /**
   * @name tag
   * @summary function for save and update
   * @param {Object} data - Tags information. If had id then this operation should be an update
   * @return {Object} tag
   */
  static tag = async data => {
    if (_.isUndefined(data._id)) {
      const id = Tags.collection.insert(data);
      return Tags.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Tags.collection.update(id, {$set: data});
      return Tags.collection.findOne(id);
    }
  };
  /**
   * @name getEvent
   * @summary Get event by id
   * @param {String} _id - Event id
   * @return {Object} Event
   */
  static getTag = _id => {
    return Tags.collection.findOne(_id);
  };
  /**
   *@name tags
   * @summary Get all tags
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all tags
   */
  static tags = query => {
    return Tags.collection.find(query).fetch();
  };
}

export default TagsService;
