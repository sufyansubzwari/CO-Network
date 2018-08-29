import Tasks from "../index";
import * as _ from "lodash";
import Requirements from '../../requirements';
/**
 * @class Task Service
 * @summary Task Service with business logic
 */
class TaskService {
  /**
   * @name task
   * @summary function for save and update
   * @param {Object} data - Task information. If had id then this operation should be an update
   * @return {Object} Task
   */
  static task = async data => {
    if (_.isUndefined(data.id)) {
      const TaskId = Tasks.collection.insert(data);
      return Tasks.collection.findOne(TaskId);
    } else {
      await Tasks.collection.update(data.id, { $set: data });
      return Tasks.collection.findOne(data.id);
    }
  };
  /**@name totalPlannedHoursByProject
   * @summary Total planned hours by project
   * @param {Object} id - Project id
   * @return {Object} Return amount planned hours
   */
  static totalPlannedHoursByProject = async id => {
    const pipeline = [
      {
        $match: {
          project_id: id
        }
      },
      {
        $group: {
          _id: "$project_id",
          totalPlannedHours: { $sum: "$hours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection
      .aggregate(pipeline, options)
      .toArray();
    return data[0].totalPlannedHours;
  };
  /**
   * @name totalLoggedHoursByProject
   * @summary Total logged hours by project
   * @param {Object} id - Project id
   * @return {Object} Return amount logged hours
   */
  static totalLoggedHoursByProject = async id => {
    const pipeline = [
      {
        $match: {
          project_id: id
        }
      },
      {
        $group: {
          _id: "$project_id",
          totalLoggedHours: { $sum: "$logHours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection
      .aggregate(pipeline, options)
      .toArray();
    return data[0].totalLoggedHours;
  };
  /**
   * @name taskByProject
   * @summary Get all task by project
   * @param {String} id - Project id
   * @return {Object} Return all task by project
   */
  static taskByProject = async id => {
    return await Tasks.collection.find({project_id:id}).fetch();
  };
  /**
   * @name taskBySprint
   * @summary Get all task by sprint
   * @param {String} id - Project id
   * @return {Object} Return all task by sprint
   */
  static taskBySprint = async id => {
    return await Tasks.collection.find({sprint_id:id}).fetch();
  };
  /**
   * @name taskByRequirement
   * @summary Get all task by requirement
   * @param {String} id - Project id
   * @return {Object} Return all task by requirement
   */
  static taskByRequirement = async id => {
    return await Tasks.collection.find({requirement_id:id}).fetch();
  };
}

export default TaskService;
