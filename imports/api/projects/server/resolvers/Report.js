import Service from "../service";
const Report = {};
Report.totalPlannedHours = async Report => {
  return Service.totalPlannedHours(Report._id);
};
Report.totalLoggedHours = async Report => {
  return Service.totalLoggedHours(Report._id);
};

export default Report;
