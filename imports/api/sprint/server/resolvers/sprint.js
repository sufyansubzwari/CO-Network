import Service from "../service";
const Sprint = {};
Sprint.activeUsers = sprint => {
  return Service.activeUsers(sprint._id);
};

export default Sprint;
