import Service from "../service";
import Places from "../../../places";
import Tags from "../../../tags";

const Mutation = {};

Mutation.job = async (root, {job}, context) => {
  let entity = Object.assign({}, job);
  let oldJob = job._id ? Service.getJob(job._id) : null;
  if (job.languages)
    entity.languages = await Tags.service.normalizeTags(job.languages, oldJob ? oldJob.languages : []);
  if (job.positionTags)
    entity.positionTags = await Tags.service.normalizeTags(job.positionTags, oldJob ? oldJob.positionTags : []);
  const inserted = await Service.job(entity);
//inserting location
  if (job.place && job.place.location && job.place.location.address) {
    let place = Object.assign({}, job.place);
    if (!place._id) {
      place.owner = inserted._id;
      place.entity = "JOB";
    }
    delete place.location.fullLocation;
    await Places.service.place(place);
  }
  return inserted;
};

Mutation.updateJobsImage = async (root, {_id, image}, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteJob = async (root, {_id}, context) => {
  return Service.deleteJob(_id);
};

export default Mutation;
