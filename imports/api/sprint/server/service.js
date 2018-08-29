import Sprints from "../index";
import * as _ from "lodash";
import Tasks from '../../task';
import Requirements from '../../requirements';
import Projects from '../../projects';
/**
 * @class Sprint Service
 * @summary Sprint Service with business logic
 */
class SprintService {
  /**
   * @name sprint
   * @summary function for save and update
   * @param {Object} data - Sprint information. If had id then this operation should be an update
   * @return {Object} Sprint
   */
  static sprint = async data => {
    if (_.isUndefined(data.id)) {
      const SprintId = Sprints.collection.insert(data);
      return Sprints.collection.findOne(SprintId);
    } else {
      await Sprints.collection.update(data.id, { $set: data });
      return Sprints.collection.findOne(data.id);
    }
  };
  /**
   * @name getSprint
   * @summary Get sprint by id
   * @param {String} _id - Sprint id
   * @return {Object} Sprint
   */
  static getSprint = _id => {
    return Sprints.collection.findOne(_id);
  };
  /**
   *@name sprints
   * @summary Get all sprints
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all sprints
   */
  static sprints = query => {
    return Projects.collection.find(query).fetch();
  };
  /**
   * @name currentSprintByProject
   * @summary Get current sprint by project
   * @param {String} id - Sprint id
   * @return {Object} Sprint
   */
  static currentSprintByProject = async id => {
    const data = await Sprints.collection
      .find({ project_id: id, status: "Open" })
      .fetch();
    return data[0];
  };
  /**
   * @name sprintByProject
   * @summary Get all sprint by project
   * @param {String} id - Sprint id
   * @return {Object} Sprint
   */
  static sprintByProject = async id => {
    const data = await Sprints.collection.find({ project_id: id }).fetch();
    return data;
  };
  /**
   * @name totalPlannedHours
   * @summary Get amount planned hours in sprint
   * @param {String} id - Sprint id
   * @return {Number} Return amount planned hours
   */
  static totalPlannedHours = async id => {
    return Tasks.service.totalPlannedHoursBySprint(id);
  };
  /**
   * @name totalLoggedHours
   * @summary Get amount logged hours in sprint
   * @param {String} id - Sprint id
   * @return {Number} Return amount logged hours
   */
  static totalLoggedHours = async id => {
    return Tasks.service.totalLoggedHoursBySprint(id);
  };
  /**
   * @name progress
   * @summary Get sprint task status
   * @param {String} id - Sprint id
   * @return [{Object}] Return all sprints tasks status
   */
  static progress = async id => {
    return Tasks.service.getTaskStatusBySprint(id);
  };
  /**
   * @name activeUsers
   * @summary Get active users in sprint
   * @param {String} id - Sprint id
   * @return [{Object}] Return all sprints tasks status
   */
  static activeUsers = async id => {
    return Tasks.service.getActiveUsersInSprint(id);
  };
}

export default SprintService;
