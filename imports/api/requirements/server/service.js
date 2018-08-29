import Requirements from "../index";
import * as _ from "lodash";
import Projects from '../../projects';
import Tasks from '../../task';
/**
 * @class Requirement Service
 * @summary Requirement Service with business logic
 */
class RequirementService {
  /**
   * @name requirement
   * @summary function for save and update
   * @param {Object} data - Requirement information. If had id then this operation should be an update
   * @return {Object} Requirement
   */
  static requirement = async data => {
    if (_.isUndefined(data.id)) {
      const RequirementId = Requirements.collection.insert(data);
      return Requirements.collection.findOne(RequirementId);
    } else {
      await Requirements.collection.update(data.id, { $set: data });
      return Requirements.collection.findOne(data.id);
    }
  };
  /**
   * @name getRequirement
   * @summary Get requirement by id
   * @param {String} _id - Requirement id
   * @return {Object} Requirement
   */
  static getRequirement = _id => {
    return Requirements.collection.findOne(_id);
  };
  /**
   *@name requirements
   * @summary Get all requirements
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all requirements
   */
  static requirements = query => {
    return Projects.collection.find(query).fetch();
  };
  /**
   * @name totalPlannedHours
   * @summary Get amount planned hours in project
   * @param {String} id - Project id
   * @return {Number} Return amount planned hours
   */
  static totalPlannedHours = async id => {
    return Tasks.service.totalPlannedHoursByProject(id);
  };
  /**
   * @name totalLoggedHours
   * @summary Get amount logged hours in project
   * @param {String} id - Project id
   * @return {Number} Return amount logged hours
   */
  static totalLoggedHours = async id => {
    return Tasks.service.totalLoggedHoursByProject(id);
  };
  /**
   * @name  requirementByProject
   * @summary Get all requirement by project
   * @param {String} id - Project id
   * @return [{Object}] Return all requirement
   */
  static requirementByProject = async id => {
    return await Requirements.collection.find({project_id:id}).fetch();
  };
  /**
   * @name progress
   * @summary Get requirement task status
   * @param {String} id - Requirement id
   * @return {Number} Return all requirement tasks status
   */
  static progress = async id => {
    return Tasks.service.getTaskStatusByRequirement(id);
  };
}

export default RequirementService;
