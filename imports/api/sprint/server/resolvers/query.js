import Service from "../service"
import Sprints from "../../index";
const Query = {};
Query.sprint = (root, { _id }, context) => {
 return Service.getSprint(_id)
};
Query.sprints = (root, { sprint }, context) => {
  let query = {};
  if (sprint) {
    query = sprint;
  }
  return Service.sprints(query)
};
export default Query;
