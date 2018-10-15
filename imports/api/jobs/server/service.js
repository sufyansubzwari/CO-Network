import Jobs from "../index";
import * as _ from "lodash";
import Notifications from "../../notifications";

/**
 * @class Job Service
 * @summary Job Service with business logic
 */
class JobsService {
  /**
   * @name job
   * @summary function for save and update
   * @param {Object} data - Job information. If had id then this operation should be an update
   * @return {Object} Job
   */
  static job = async data => {
    if (_.isUndefined(data._id)) {
      const id = Jobs.collection.insert(data);
      Notifications.service.generateNotification("POST", id, "JOB", data.owner, data.title);
      return Jobs.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Jobs.collection.update(id, { $set: data });
      Notifications.service.generateNotification("UPDATE", id, "JOB", data.owner, data.title);
      return Jobs.collection.findOne(id);
    }
  };
  /**
   * @name deleteJob
   * @summary Allow delete an job
   * @param {String} id - Job id
   * @return {Object} Job deleted
   */
  static deleteJob = async id => {
    const entity = Jobs.collection.findOne(id);
    await Jobs.collection.remove(id);
    Notifications.service.generateNotification("DELETE", id, entity.entity, entity.owner, entity.title);
    return id;
  };
  /**
   * @name updateImage
   * @summary Allow update image to an job
   * @param {String} id - Job id
   * @param {String} image - Job image
   * @return {Object} Job updated
   */
  static updateImage = async (id, image) => {
    await Jobs.collection.update(id, {
      $set: { image: image }
    });
    return await Jobs.collection.findOne(id);
  };
  /**
   * @name getEvent
   * @summary Get event by id
   * @param {String} _id - Event id
   * @return {Object} Event
   */
  static getJob = _id => {
    return Jobs.collection.findOne(_id);
  };
  /**
   *@name events
   * @summary Get all events
   * @param {Object} query - query parameters
   * @param {Object} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all events
   */
  static jobs = (query, limit) => {
    return Jobs.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };
  static jobCounts = async field => {
    const counts = await Jobs.collection
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

export default JobsService;
