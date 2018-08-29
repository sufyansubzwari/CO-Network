import Tasks from "../index";
import * as _ from "lodash";

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
  /**
   * @name getTask
   * @summary Get task by id
   * @param {String} _id - Task id
   * @return {Object} Task
   */
  static getTask = _id => {
    return Tasks.collection.findOne(_id);
  };
  /**
   *@name tasks
   * @summary Get all tasks
   * @param {Object} query - query parameters
   * @return {Object} | [{Object }] Return one or all tasks
   */
  static tasks = query => {
    return Tasks.collection.find(query).fetch();
  };
  /**
   * @name assignTask
   * @summary Assign task to user
   * @param {String} task_id Task id
   * @param {String} user_id User id
   * */
  static assignTask = async ( task_id , user_id) => {
    const Task = Tasks.collection.findOne(task_id);

    const userNew = Users.collection.findOne(user_id);
    if (userNew) {
      if (!_.isUndefined(Task.assigned)) {
        const oldUserId = Task.assigned;
        if (!_.isUndefined(Task.ownerWork)) {
          let exitHistory = _.findIndex(Task.ownerWork, { user_id: oldUserId });
          if (exitHistory === -1) {
            Task.ownerWork.push({ user_id: oldUserId, working_hours: 0 });
          }
        } else {
          Task.ownerWork = [];
          Task.ownerWork.push({ user_id: oldUserId, working_hours: 0 });
        }
      }
      Task.assigned = userNew._id;

      Tasks.collection.update(task_id, { $set: Task });
      return Tasks.collection.findOne(task_id);
    }
    throw  new  Error("User no found")
  };
  /**
   * @name totalPlannedHoursByProject
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
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
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
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
    return data[0].totalLoggedHours;
  };
  /**
   * @name totalPlannedHoursBySprint
   * @summary Total planned hours by sprint
   * @param {Object} id - Sprint id
   * @return {Object} Return amount planned hours
   */
  static totalPlannedHoursBySprint = async id => {
    const pipeline = [
      {
        $match: {
          sprint_id: id
        }
      },
      {
        $group: {
          _id: "$sprint_id",
          totalPlannedHours: { $sum: "$hours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
    return data[0].totalPlannedHours;
  };
  /**
   * @name totalLoggedHoursBySprint
   * @summary Total logged hours by sprint
   * @param {Object} id - Sprint id
   * @return {Object} Return amount logged hours
   */
  static totalLoggedHoursBySprint = async id => {
    const pipeline = [
      {
        $match: {
          sprint_id: id
        }
      },
      {
        $group: {
          _id: "$sprint_id",
          totalLoggedHours: { $sum: "$logHours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
    return data[0].totalLoggedHours;
  };
  /**
   * @name totalPlannedHoursByRequirement
   * @summary Total planned hours by requirement
   * @param {Object} id - Requirement id
   * @return {Object} Return amount planned hours
   */
  static totalPlannedHoursByRequirement = async id => {
    const pipeline = [
      {
        $match: {
          requirement_id: id
        }
      },
      {
        $group: {
          _id: "$requirement_id",
          totalPlannedHours: { $sum: "$hours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
    return data[0].totalPlannedHours;
  };
  /**
   * @name totalLoggedHoursByRequirement
   * @summary Total logged hours by sprint
   * @param {Object} id - Requirement id
   * @return {Object} Return amount logged hours
   */
  static totalLoggedHoursByRequirement = async id => {
    const pipeline = [
      {
        $match: {
          requirement_id: id
        }
      },
      {
        $group: {
          _id: "$requirement_id",
          totalLoggedHours: { $sum: "$logHours" }
        }
      }
    ];
    const options = {};
    const data = await Tasks.collection.aggregate(pipeline, options).toArray();
    return data[0].totalLoggedHours;
  };
  /**
   * @name taskByProject
   * @summary Get all task by project
   * @param {String} id - Project id
   * @return {Object} Return all task by project
   */
  static taskByProject = async id => {
    return await Tasks.collection.find({ project_id: id }).fetch();
  };
  /**
   * @name taskBySprint
   * @summary Get all task by sprint
   * @param {String} id - Project id
   * @return {Object} Return all task by sprint
   */
  static taskBySprint = async id => {
    return await Tasks.collection.find({ sprint_id: id }).fetch();
  };
  /**
   * @name taskByRequirement
   * @summary Get all task by requirement
   * @param {String} id - Project id
   * @return {Object} Return all task by requirement
   */
  static taskByRequirement = async id => {
    return await Tasks.collection.find({ requirement_id: id }).fetch();
  };
  /**
   * @name getTaskStatusByProject
   * @summary Get all task progress over total
   * @param {String} id - Project id
   * @return {Object} Return all task progress over total
   */
  static getTaskStatusByProject = async id => {
    let nums = Tasks.collection.count();
    const pipeline = [
      {
        $match: {
          project_id: id
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          percentage: {
            $concat: [
              {
                $substr: [
                  {
                    $multiply: [
                      { $divide: ["$count", { $literal: nums }] },
                      100
                    ]
                  },
                  0,
                  2
                ]
              },
              "",
              "%"
            ]
          }
        }
      }
    ];
    const options = {};

    return await Tasks.collection.aggregate(pipeline, options).toArray();
  };
  /**
   * @name getTaskStatusByRequirement
   * @summary Get all task progress over total
   * @param {String} id - Requirement id
   * @return {Object} Return all task progress over total
   */
  static getTaskStatusByRequirement = async id => {
    let nums = Tasks.collection.count();
    const pipeline = [
      {
        $match: {
          requirement_id: id
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$id",
          count: 1,
          percentage: {
            $concat: [
              {
                $substr: [
                  {
                    $multiply: [
                      { $divide: ["$count", { $literal: nums }] },
                      100
                    ]
                  },
                  0,
                  2
                ]
              },
              "",
              "%"
            ]
          }
        }
      }
    ];
    const options = {};

    return await Tasks.collection.aggregate(pipeline, options).toArray();
  };
  /**
   * @name getTaskStatusBySprint
   * @summary Get all task progress over total
   * @param {String} id - Sprint id
   * @return {Object} Return all task progress over total
   */
  static getTaskStatusBySprint = async id => {
    let nums = Tasks.collection.count();
    const pipeline = [
      {
        $match: {
          sprint_id: id
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: "$id",
          count: 1,
          percentage: {
            $concat: [
              {
                $substr: [
                  {
                    $multiply: [
                      { $divide: ["$count", { $literal: nums }] },
                      100
                    ]
                  },
                  0,
                  2
                ]
              },
              "",
              "%"
            ]
          }
        }
      }
    ];
    const options = {};

    return await Tasks.collection.aggregate(pipeline, options).toArray();
  };
}

export default TaskService;
