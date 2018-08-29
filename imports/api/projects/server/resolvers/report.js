import Service from "../service";
const Report = {};
Report.totalPlannedHours = project => {
  return Service.totalPlannedHours(project._id);
};
Report.totalLoggedHours =  project => {
  return Service.totalLoggedHours(project._id);
};
Report.currentSprint =  project => {
  return Service.currentSprint(project._id);
};
Report.progress =  project => {
  return Service.progress(project._id);
};

export default Report;
