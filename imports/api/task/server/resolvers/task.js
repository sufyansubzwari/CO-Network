import Service from "../service";
const Task = {};

Task.assigned = task => {
  return Service.assigned(task.assigned);
};
Task.ownerWork = async task => {
  return Service.ownerWork(task._id);
};

export default Task;
