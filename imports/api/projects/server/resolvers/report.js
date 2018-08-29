import Service from "../service";
import Project from './project';
const Report = {};
Report.totalPlannedHours = async project => {
  return Service.totalPlannedHours(project._id);
};
Report.totalLoggedHours = async project => {
  return Service.totalLoggedHours(project._id);
};
Project.currentSprint = async project => {
  return Service.currentSprint(project._id,);
};

export default Report;
