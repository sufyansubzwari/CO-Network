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
    let tags = Tags.collection.findOne({label: data.label});
    if (_.isUndefined(data._id) && !tags) {
      const id = Tags.collection.insert(data);
      return Tags.collection.findOne(id);
    } else {
      let id = data._id || tags._id;
      data._id ? delete data._id : null;
      await Tags.collection.update(id, {$set: data});
      return Tags.collection.findOne(id);
    }
  };
  /**
   * @name getTag
   * @summary Get tag by id
   * @param {String} _id - tag id
   * @return {Object} tag
   */
  static getTag = _id => {
    return Tags.collection.findOne(_id);
  };
  static getTagList = tags => {
    return Tags.collection.find({_id: {"$in": tags}});
  };
  /**
   *@name tags
   * @summary Get all tags
   * @param {Object} query - query parameters
   * @param {Object} limit - query limit
   * @return {Object}||[{Object }] Return one or all tags
   */
  static tags = (query, limit) => {
    return Tags.collection.find(query, limit).fetch();
  };
  static normalizeTags = async (entity) => {
    let insertTags = entity.category.filter(item => !item._id);
    let tags = entity.category.filter(item => item._id);
    let tagsInserted = insertTags.map(async tag => {
      return await Tags.service.tag(tag);
    });
    return Promise.all(tagsInserted).then((completed) => {
      tags = tags.concat(completed);
      delete entity.category;
      entity.category = tags.map(item => item._id);
      return entity;
    });
  }
}

export default TagsService;
