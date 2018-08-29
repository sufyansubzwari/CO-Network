import Service from "../service";
import Sprints from "../../index";

const Mutation = {};

Mutation.sprint = async (root, { sprint }, context) => {
  return Service.sprint(sprint);
};

export default Mutation;
