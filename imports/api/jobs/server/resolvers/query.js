import Service from "../service";
import { wrapOperators } from "../../../aux-functions";
import Places from "../../../places";
import JobApply from "../../../jobApply";

const Query = {};

Query.job = (root, { _id }, context) => {
  return Service.getJob(_id);
};
Query.jobs = (root, { filter, limit, jobs }, context) => {
  let query = {};
  if (jobs) {
    if (jobs.location) {
      console.log(jobs.location.map(item => item.address));
      let loc = Places.service.places({
        "location.address": { $in: jobs.location.map(item => item.address) }
      });
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
  const myJobs = await Service.jobs({ owner: owner }, {}).count();
  const jobs = await JobApply.service.jobsApply(
    { owner: owner },
    { fields: { job: 1 } }
  );
  const myApplies = await Service.jobs({ _id: { $in: { jobs } } }, {}).count();
  return {
    myJobs,
    myApplies
  };
};

export default Query;
