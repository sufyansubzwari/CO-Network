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
    let tags = Tags.collection.findOne({ label: data.label });
    if (_.isUndefined(data._id) && !tags) {
      const id = Tags.collection.insert(data);
      return Tags.collection.findOne(id);
    } else {
      let id = data._id || tags._id;
      data._id ? delete data._id : null;
      await Tags.collection.update(id, { $set: data });
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
    return Tags.collection.find({ _id: { $in: tags } }).fetch();
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

  static normalizeTags = async (tagList, entityTagList) => {
    let tagsInserted = tagList.map(async tag => {
      return await Tags.service.tag(tag);
    });
    return Promise.all(tagsInserted).then(completed => {
      UpdateCounters(completed, entityTagList);
      return completed.map(item => item._id);
    });
  };

  static normalizeTagsWithLevels = async (tagList, entityTagList) => {
    let tagsInserted = tagList.map(async item => {
      return {
        tag: await Tags.service.tag(item.tag),
        level: item.level || "",
        icon: item.icon || "",
        levelColor: item.levelColor || ""
      };
    });
    return Promise.all(tagsInserted).then(completed => {
      UpdateCounters(completed.map(item => item.tag), entityTagList.map(item => item.tag));
      return completed.map(item => ({
        tag: item.tag._id,
        level: item.level || "",
        icon: item.icon || "",
        levelColor: item.levelColor || ""
      }));
    });
  };
}

export default TagsService;

const UpdateCounters = (tagList, entityTagList) => {
  const incrementCounts = tagList.filter(
    item => entityTagList.indexOf(item._id) === -1
  );
  const decrementCounts = entityTagList.filter(
    item => tagList.map(item => item._id).indexOf(item) === -1
  );
  incrementCounts.forEach(tag => {
    Tags.collection.update({ _id: tag._id }, { $inc: { used: 1 } });
  });
  decrementCounts.forEach(id => {
    Tags.collection.update({ _id: id, used : {$gt : 0} }, { $inc: { used: -1 } });
  });
};
