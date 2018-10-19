import Service from "../service";
import { wrapOperators } from "../../../aux-functions";
import Places from "../../../places";
import JobApply from "../../../jobApply/server/service";

const Query = {};

Query.job = (root, { _id }, context) => {
  return Service.getJob(_id);
};
Query.jobs = (root, { filter, limit, jobs }, context) => {
  let query = {};
  if (jobs) {
    if (jobs.location) {
      let loc = Places.service.matchLocations(jobs.location, 0.05);
      jobs["_id"] = { $in: loc.map(item => item.owner) };
      delete jobs.location;
    }
    query = wrapOperators(jobs);
  }
  if (filter) {
    query = {
      $or: [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } }
      ]
    };
  }
  let limitQuery = limit ? { limit: limit } : {};
  return Service.jobs(query, limitQuery);
};

Query.jobCounts = async (root, { field }, context) => {
  return await Service.jobCounts(field);
};

Query.myJobs = async (root, { owner }, context) => {
  const myJobs = await Service.jobs({ owner: owner }, {fields: {_id: 1 }}).map(item => item._id);
  const jobs = JobApply.jobsApply(
    { owner: owner },
    { fields: { job: 1 } }
  ).map(item => item.job);
  const myApplies = await Service.jobs({ _id: { $in: jobs } }, {fields: {_id: 1 }}).map(item => item._id);
  return {
    myJobs,
    myApplies
  };
};

export default Query;
