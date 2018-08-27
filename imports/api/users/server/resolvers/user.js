import Task from "../../../task";

const User = {};
User.services = (root, args, context) => {
  // Get current user
  const { user } = context;

  // In case user is not logged in, return no services
  if (!user) {
    return [];
  }

  // TODO: we should only return current loggedIn service instead of all
  // available services
  return (user.services && Object.keys(user.services)) || [];
};
User.totalPlannedHours = async user => {
  const pipeline = [
    {
      $match: {
        assigned: user._id
      }
    },
    {
      $lookup: {
        from: "Projects",
        localField: "project_id",
        foreignField: "_id",
        as: "projects"
      }
    },
    { $unwind: "$projects" },
    {
      $group: {
        _id: "projects.id",
        project: { $each: "$projects" },
        totalPlannedHours: { $sum: "$hours" }
      }
    }
  ];
  const options = {};
  const data = await Task.collection
    .rawCollection()
    .aggregate(pipeline, options)
    .toArray();
  console.log(data);
  return data;
};

export default User;
