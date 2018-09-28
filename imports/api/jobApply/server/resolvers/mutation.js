import Service from "../service";
import Tags from "../../../tags";
import Achievement from "../../../archivements/server/service";

const Mutation = {};

Mutation.jobApply = async (root, { jobApply }, context) => {
  let entity = Object.assign({}, jobApply);
  let oldJobApply = jobApply._id ? Service.getJobApply(jobApply._id) : null;

  if (jobApply.professional.languages)
    entity.professional.languages = await Tags.service.normalizeTagsWithLevels(
      jobApply.professional.languages,
      oldJobApply &&
      oldJobApply.professional &&
      oldJobApply.professional.languages
        ? oldJobApply.professional.languages
        : []
    );
  if (jobApply.professional.expertise)
    entity.professional.expertise = await Tags.service.normalizeTagsWithLevels(
      jobApply.professional.expertise,
      oldJobApply && oldJobApply.professional && oldJobApply.professional.expertise ? oldJobApply.professional.expertise : []
    );
  if (jobApply.professional.industry)
    entity.professional.industry = await Tags.service.normalizeTags(
      jobApply.professional.industry,
      oldJobApply && oldJobApply.professional && oldJobApply.professional.industry ? oldJobApply.professional.industry : []
    );
  if (jobApply.professional.industry)
    entity.professional.industry = await Tags.service.normalizeTags(
      jobApply.professional.industry,
      oldJobApply && oldJobApply.professional && oldJobApply.professional.industry ? oldJobApply.professional.industry : []
    );

  const achievementsList = Object.assign([], jobApply.achievements);
  const inserted =  await Service.jobApply(entity);

  const f = await Achievement.deleteAchievement({owner: inserted._id});

  if (achievementsList && achievementsList.length > 0) {
    achievementsList.forEach(async ach => {
      if (ach._id) {
        delete ach._id
      }
      ach.owner = inserted._id;
      await Achievement.achievement(ach);
    });
  }

  return inserted
};

Mutation.updateJobApplyImage = async (root, { _id, image }, context) => {
  return Service.updateImage(_id, image);
};

Mutation.deleteJobApply = async (root, { _id }, context) => {
  return Service.deleteJobApply(_id);
};

export default Mutation;
