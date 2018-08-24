import { Meteor } from "meteor/meteor";
import Sprints from "../../index";
const Query = {};
Query.sprint = (root, { _id }, context) => {
  if (_id) {
    const sprint = Sprints.collection.findOne(_id);
    console.log(sprint);
    return sprint;
  }
  throw new Error("Missing parameter");
};
Query.searchSprint = (root, { sprint }, context) => {
  let query = {};
  if (sprint) {
    query = sprint;
  }
  const sprints = Sprints.collection.find(query).fetch();
  console.log(sprints);
  return sprints;
};
Query.sprints = (root, args, context) => {
  const sprints = Sprints.collection.find({}).fetch();
  console.log(Sprints);
  return sprints;
};

export default Query;
