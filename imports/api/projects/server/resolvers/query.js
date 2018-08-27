import { Meteor } from "meteor/meteor";
import Projects from "../../index";
const Query = {};
Query.project = (root, { _id }, context) => {
  if (_id) {
    const project = Projects.collection.findOne(_id);
    return project;
  }
  throw new Error("Missing parameter");
};
Query.searchProject = (root, { project }, context) => {
  let query = {};
  if (project) {
    query = project;
  }
  const projects = Projects.collection.find(query).fetch();
  console.log(projects);
  return projects;
};
Query.projects = (root, args, context) => {
  const projects = Projects.collection.find({}).fetch();
  console.log(projects);
  return projects;
};

export default Query;
