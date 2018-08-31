import Service from "../service"
import Tasks from "../../index";
import Users from "../../../users";
import * as _ from "lodash";
const Mutation = {};

Mutation.task = async (root, { task }, context) => {
    return Service.task(task);
};
Mutation.assignTask = async (root, { task_id, user_id,hours }, context) => {
  return Service.assignTask(task_id, user_id,hours)
};
export default Mutation;
