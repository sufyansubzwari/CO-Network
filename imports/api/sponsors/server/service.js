import Sponsors from "../index";
import * as _ from "lodash";
import Notifications from "../../notifications";

/**
 * @class Sponsors Service
 * @summary Sponsors Service with business logic
 */
class SponsorsService {
  /**
   * @name sponsor
   * @summary function for save and update
   * @param {Object} data - Sponsor information. If had id then this operation should be an update
   * @return {Object} Sponsor
   */
  static sponsor = async data => {
    if (_.isUndefined(data._id)) {
      const id = Sponsors.collection.insert(data);
      return Sponsors.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Sponsors.collection.update(id, { $set: data });
      return Sponsors.collection.findOne(id);
    }
  };
  /**
   * @name deleteSponsors
   * @summary Allow delete an sponsor
   * @param {String} id - Sponsor id
   * @return {Object} Sponsor deleted
   */
  static deleteSponsor = async id => {
    return await Sponsors.collection.remove(id);

  };

  /**
   * @name get
   * @summary Get sponsor by id
   * @param {String} _id - Sponsor id
   * @return {Object} Sponsor
   */
  static getSponsor = _id => {
    return Sponsors.collection.findOne(_id);
  };
  /**
   *@name sponsors
   * @summary Get all sponsors
   * @param {Object} query - query parameters
   * @param {Object} limit - limit parameters
   * @return {Object}||[{Object }] Return one or all sponsors
   */
  static sponsors = (query, limit) => {
    return Sponsors.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };

    /**
     * @name sponsors
     * @summary get all sponsor by owner
     * @param {String} owner - Sponsor owner
     * return {Object}||[{Object}] Return one or all sponsors
     */
    static getSponsorsByOwner = owner => {
      return Sponsors.collection.find({owner: owner}).fetch();

    }
}

export default SponsorsService;
