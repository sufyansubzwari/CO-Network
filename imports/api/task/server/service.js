import Tasks from "../index";
import * as _ from "lodash";
/**
 * @class Task Service
 * @summary Task Service with business logic
 */
class TaskService {
  /**
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
  /**
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
}

export default TaskService;
