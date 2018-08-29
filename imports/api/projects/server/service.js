import Projects from "../index";
import Tasks from "../../task";
import Sprints from "../../sprint";
import Requirements from "../../requirements";
import * as _ from "lodash";
/**
 * @class Project Service
 * @summary Project Service with business logic
 */
class ProjectService {
  /**
   * @name project
   * @summary function for save and update
   * @param {Object} data - Project information. If had id then this operation should be an update
   * @return {Object} Project
   */
  static project = async data => {
    if (_.isUndefined(data.id)) {
      const projectId = Projects.collection.insert(data);
      return Projects.collection.findOne(projectId);
    } else {
      await Projects.collection.update(data.id, { $set: data });
      return Projects.collection.findOne(data.id);
    }
  };
  /**
   * @name addMemberToProject
   * @summary Allow add member to project
   * @param {String} project_id - Project id
   * @param {String} use_id - User id
   * @return {Object} Project update
   */
  static addMemberToProject = async (project_id, use_id) => {
    await Projects.collection.update(project_id, {
      $addToSet: { members: use_id }
    });
    return await Projects.collection.findOne(project_id);
  };
  /**
   * @name getProject
   * @summary Get project by id
   * @param {String} _id - Project id
   * @return {Object} Project
   */
  static getProject = _id => {
    return Projects.collection.findOne(_id);
  };
  /**
   *@name projects
   * @summary Get all projects
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all project
   */
  static projects = query => {
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
   * @name currentSprint
   * @summary Get Open sprint
   * @param {String} id - Project id
   * @return {Object} Return open sprint
   */
  static currentSprint = async id => {
    return Sprints.service.currentSprintByProject(id);
  };
  /**
   * @name members
   * @summary Get all projects members
   * @param {String} id - Project id
   * @return {Number} Return all projects members
   */
  static members = async id => {
    const pipeline = [
      {
        $unwind: "$members"
      },
      {
        $match: {
          _id: _id
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "members"
        }
      }
    ];
    const options = {};
    const data = await Projects.collection
      .aggregate(pipeline, options)
      .toArray();
    return data[0].members;
  };
  /**
   * @name sprints
   * @summary Get all projects sprint
   * @param {String} id - Project id
   * @return {Number} Return all projects sprints
   */
  static sprints = async id => {
    return Sprints.service.sprintByProject(id);
  };
  /**
   * @name requirements
   * @summary Get all projects requirements
   * @param {String} id - Project id
   * @return {Number} Return all projects requirements
   */
  static requirements = async id => {
    return Requirements.service.requirementByProject(id);
  };
  /**
   * @name tasks
   * @summary Get all projects tasks
   * @param {String} id - Project id
   * @return {Number} Return all projects tasks
   */
  static tasks = async id => {
    return Tasks.service.taskByProject(id);
  };
  /**
   * @name progress
   * @summary Get project task status
   * @param {String} id - Project id
   * @return [{Object}] Return all projects tasks status
   */
  static progress = async id => {
    return Tasks.service.getTaskStatusByProject(id);
  };
}

export default ProjectService;
