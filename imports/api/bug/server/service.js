import Bugs from "../index";

import * as _ from "lodash";
/**
 * @class bug Service
 * @summary bug Service with business logic
 */
class BugService {
  /**
   * @name bug
   * @summary function for save and update
   * @param {Object} data - bug information. If had id then this operation should be an update
   * @return {Object} bug
   */
  static bug = async data => {
    if (_.isUndefined(data.id)) {
      const bugId = Bugs.collection.insert(data);
      return Bugs.collection.findOne(bugId);
    } else {
      await Bugs.collection.update(data.id, { $set: data });
      return Bugs.collection.findOne(data.id);
    }
  };
   /**
   * @name getBug
   * @summary Get bug by id
   * @param {String} _id - bug id
   * @return {Object} bug
   */
  static getBug = _id => {
    return Bugs.collection.findOne(_id);
  };
  /**
   *@name bugs
   * @summary Get all Bugs
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all bug
   */
  static bugs = query => {
    return Bugs.collection.find(query).fetch();
  };
 }

export default BugService;
