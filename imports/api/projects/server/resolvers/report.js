import Service from "../service";
import Project from './project';
const Report = {};
Report.totalPlannedHours = project => {
  return Service.totalPlannedHours(project._id);
};
Report.totalLoggedHours =  project => {
  return Service.totalLoggedHours(project._id);
};
Project.currentSprint =  project => {
  return Service.currentSprint(project._id,);
};

export default Report;
