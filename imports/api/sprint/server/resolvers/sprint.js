import Task from "../../../task";
import Project from '../../../projects/server/resolvers/project';

const Sprint = {};
Sprint.totalPlannedHours = async sprint => {
  const pipeline = [
    {
      $match: {
        sprint_id: sprint._id
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
  const data = await Task.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].totalPlannedHours;
};
Sprint.totalLoggedHours = async sprint => {
  const pipeline = [
    {
      $match: {
        sprint_id: sprint._id
      },
    },
    {
      $group: {
        _id: '$sprint_id',
        totalLoggedHours: { $sum: '$logHours' },
      },
    },
  ];
  const options = {};
  const data = await Task.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  return data[0].totalLoggedHours;
};

export default Sprint;
