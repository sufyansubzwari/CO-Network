import Service from "../service";

const Query = {};
Query.bug = (root, { _id }, context) => {
  return Service.getBug(_id);
};
Query.bugs = (root, { bug }, context) => {
  let query = {};
  if (bug) {
    query = bug;
  }
  return Service.bugs(query);
};

export default Query;
