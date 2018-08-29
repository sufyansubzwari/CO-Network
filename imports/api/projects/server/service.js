import Projects from "../index";
import * as _ from "lodash";
/**
 * @class Project Service
 * @summary Project Service with business logic
 */
class ProjectService {
  /**
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
   * @summary Get project by id
   * @param {String} _id - Project id
   * @return {Object} Project
   */
  static getProject = _id => {
    return Projects.collection.findOne(_id);
  };
  /**
   * @summary Get all projects
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all project
   */
  static projects = query => {
    return Projects.collection.find(query).fetch();
  };
  /**
   * @summary Get amount planned hours in project
   * @param {String} id - Project id
   * @return {Number} Return amount planned hours
   */
  totalPlannedHours = async id => {
    return;
  };
  /**
   * @summary Get amount logged hours in project
   * @param {String} id - Project id
   * @return {Number} Return amount logged hours
   */
  totalLoggedHours = async id => {

    return ;
  };
  /**
   * @summary Get Open sprint
   * @param {String} id - Project id
   * @return {Number} Return open sprint
   */
  currentSprint = async id => {
  };
  /**
   * @summary Get all projects members
   * @param {String} id - Project id
   * @return {Number} Return all projects members
   */
  members = async id => {
    const pipeline = [
      {
        $unwind: "$members"
      },
      {
        $match: {
          _id:_id
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
}

export default ProjectService;
