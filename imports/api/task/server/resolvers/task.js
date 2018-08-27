import Users from "../../../users";
import TaskCollection from "../../index";

const Task = {};

Task.assignedUser = task => {
  return Users.collection.findOne(task.assigned);
};
Task.ownerWork = async task => {
  const pipeline = [
    {
      $unwind: "$ownerWork"
    },
    {
      $match: {
        _id: task._id
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "ownerWork.user_id",
        foreignField: "_id",
        as: "owners"
      }
    },
    { $unwind: "$owners" },
    {
      $group: {
        _id: "$_id",
        ownerWork: {
          $push: { user: "$owners", worksHours: "$ownerWork.working_hours" }
        }
      }
    }
  ];
  const options = {};
  const data = await TaskCollection.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].ownerWork;
};

export default Task;
