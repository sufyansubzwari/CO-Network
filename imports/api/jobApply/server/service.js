import JobApply from "../index";
import * as _ from "lodash";

/**
 * @class JobApply Service
 * @summary JobApply Service with business logic
 */
class JobApplyService {
  /**
   * @name jobApply
   * @summary function for save and update
   * @param {Object} data - JobApply information. If had id then this operation should be an update
   * @return {Object} JobApply
   */
  static jobApply = async data => {
    if (_.isUndefined(data._id)) {
      const id = JobApply.collection.insert(data);
      return JobApply.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await JobApply.collection.update(id, { $set: data });
      return JobApply.collection.findOne(id);
    }
  };
  /**
   * @name deleteJobApply
   * @summary Allow delete an JobApply
   * @param {String} id - JobApply id
   * @return {Object} JobApply deleted
   */
  static deleteJobApply = async id => {
    return await JobApply.collection.remove(id);
  };
  /**
   * @name updateImage
   * @summary Allow update image to an JobApply
   * @param {String} id - JobApply id
   * @param {String} image - JobApply image
   * @return {Object} JobApply updated
   */
  static updateImage = async (id, image) => {
    await JobApply.collection.update(id, {
      $set: { image: image }
    });
    return await JobApply.collection.findOne(id);
  };
  /**
   * @name getJobApply
   * @summary Get JobApply by id
   * @param {String} _id - JobApply id
   * @return {Object} JobApply
   */
  static getJobApply = _id => {
    return JobApply.collection.findOne(_id);
  };
  /**
   *@name jobsApply
   * @summary Get all jobsApply
   * @param {Object} query - query parameters
   * @param {Object} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all jobsApply
   */
  static jobsApply = (query, limit) => {
    return JobApply.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };
  static jobApplyCounts = async field => {
    const counts = await JobApply.collection
      .aggregate([
        { $unwind: `$${field}` },
        { $group: { _id: `$${field}.label`, number: { $sum: 1 } } }
      ])
      .toArray();
    return Promise.all(counts)
      .then(completed => {
        return completed;
      })
      .catch(error => console.log(error));
  };
}

export default JobApplyService;
