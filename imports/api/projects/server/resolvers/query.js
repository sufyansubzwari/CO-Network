import Service from "../service";
const Query = {};
Query.project = (root, { _id }, context) => {
  return Service.getProject(_id);
};
Query.projects = (root, { project }, context) => {
  let query = {};
  if (project) {
    query = project;
  }
  return Service.projects(query);
};

export default Query;
