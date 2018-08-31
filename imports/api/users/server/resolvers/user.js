import Service from "../service"

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
User.report=(root, {project_id,startDate,endDate}, context)=>{
  return Service.report(root._id,project_id,startDate,endDate)
};

export default User;
