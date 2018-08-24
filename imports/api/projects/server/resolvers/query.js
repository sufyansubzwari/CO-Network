import { Meteor } from "meteor/meteor";
import Projects from "../../index";
const Query = {};

Query.project = (root, args, context) => {
  return Projects.collection.find(args).fetch();
};

export default Query;
