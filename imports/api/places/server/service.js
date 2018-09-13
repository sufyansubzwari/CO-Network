import Places from "../index";
import * as _ from "lodash";

/**
 * @class PlacesService
 * @summary Places Service with business logic
 */
class PlacesService {
  /**
   * @name place
   * @summary function for save and update
   * @param {Object} data - Places information. If had id then this operation should be an update
   * @return {Object} Places
   */
  static place = async data => {
    if (_.isUndefined(data._id)) {
      const id = Places.collection.insert(data);
      return Places.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Places.collection.update(id, {$set: data});
      return Places.collection.findOne(id);
    }
  };
  /**
   * @name deletePlace
   * @summary Allow delete a place
   * @param {String} id - Place id
   * @return {Object} Place deleted
   */
  static deletePlace = async (id) => {
    return await Places.collection.remove(id);
  };
  /**
   * @name getPlace
   * @summary Get place by id
   * @param {String|Object} _id - Place id
   * @return {Object} Places
   */
  static getPlace = _id => {
    return Places.collection.findOne(_id);
  };
  /**
   *@name places
   * @summary Get all places
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all places
   */
  static places = (query, limit) => {
    return Places.collection.find(query, limit).fetch();
  };
}

export default PlacesService;
