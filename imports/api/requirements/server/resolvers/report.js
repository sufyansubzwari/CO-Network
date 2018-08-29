import Service from "../service";
const Report = {};
Report.totalPlannedHours = requirement => {
  return Service.totalPlannedHours(requirement._id);
};
Report.totalLoggedHours =  requirement => {
  return Service.totalLoggedHours(requirement._id);
};
Report.progress =  requirement => {
  return Service.progress(requirement._id);
};

export default Report;
