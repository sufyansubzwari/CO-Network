import Project from "../../../projects";

const Bug = {};

Bug.project = project => {
  return Project.collection.findOne(project.project_id);
};

export default Bug;
