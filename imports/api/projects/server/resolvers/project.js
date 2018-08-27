import Task from "../../../task";
import Sprint from "../../../sprint";
import ProjectCollection from "../../index";

const Project = {};
Project.totalPlannedHours = async project => {
  const pipeline = [
    {
      $match: {
        project_id: project._id
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
  const data = await Task.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].totalPlannedHours;
};
Project.totalLoggedHours = async project => {
  const pipeline = [
    {
      $match: {
        project_id: project._id
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
  const data = await Task.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].totalLoggedHours;
};
Project.currentSprint = async project => {
  const data = await Sprint.collection
    .find(
      { project_id: project._id, status: "Open" },
      { sort: { starDate: -1 }, limit: 1 }
    )
    .fetch();
  console.log(data);
  return data[0];
};
Project.members = async project => {
  const pipeline = [
    {
      $unwind: "$members"
    },
    {
      $match: {
        _id: project._id
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
  const data = await ProjectCollection.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].members;
};
Project.tasks = async project => {
  return await Task.collection.find({ project_id: project._id }).fetch();
};
export default Project;
