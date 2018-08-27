import { Meteor } from "meteor/meteor";
import Bugs from "../../index";
const Query = {};
Query.bug = (root, { _id }, context) => {
  if (_id) {
    const bug = Bugs.collection.findOne(_id);
    console.log(bug);
    return bug;
  }
  throw new Error("Missing parameter");
};
Query.bugs = (root, {project_id}, context) => {
  let query = {};
  if (project_id) {
    query = project_id;
  }
  const bugData = Bugs.collection.find(query).fetch();
  return bugData;
};


export default Query;
