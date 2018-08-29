import Service from "../service";
const Requirement = {};
Requirement.status =  requirement => {
  return Service.status(requirement._id);
};

export default Requirement;
