import { Meteor } from "meteor/meteor";
import Tasks from "../../index";
import Users from "../../../users";
import * as _ from "lodash";
const Mutation = {};

Mutation.saveTask = async (root, { task }, context) => {
  const taskId = Tasks.collection.insert(task);
  return Tasks.collection.findOne(taskId);
};
Mutation.assignTask = async (root, { task_id, user_id }, context) => {
  console.log(task_id);
  console.log(user_id);
  const Task = Tasks.collection.findOne(task_id);

  const userNew = Users.collection.findOne(user_id);
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
};
export default Mutation;
