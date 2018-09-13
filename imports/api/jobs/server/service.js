import Jobs from "../index";
import PlaceServices from '../../places/server/service';
import * as _ from "lodash";

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
      if (data.location) {
        let place = {};
        place.location = data.location;
        place.entity = "JOB";
        place.owner = id;
        PlaceServices.place(location);
      }
      return Jobs.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Jobs.collection.update(id, {$set: data});
      console.log(data);
      if (data.location) {
        let place = PlaceServices.getPlace({owner: id});
        if (place) {
          place.location = data.location;
        }
        else {
          place = {
            location: data.location,
            entity: "JOB",
            owner: id,
          }
        }
        console.log(place);
        PlaceServices.place(place);
      }
      return Jobs.collection.findOne(id);
    }
  };
  /**
   * @name deleteJob
   * @summary Allow delete an job
   * @param {String} id - Job id
   * @return {Object} Job deleted
   */
  static deleteJob = async (id) => {
    return await Jobs.collection.remove(id);
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
      $addToSet: {image: image}
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
    return Jobs.collection.find(query, limit).fetch();
  };
}

export default JobsService;
