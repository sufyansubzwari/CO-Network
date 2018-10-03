import Users from "../../../users";
import Tags from "../../../tags";
import {normalizeTagsWithLevels} from "../../../aux-functions";
import Achievements from "../../../archivements/server/service";

const JobApply = {};

JobApply.owner = entity => {
  return Users.service.getUser(entity.owner);
};

JobApply.professional = entity => {

  entity.professional.languages ? entity.professional.languages = normalizeTagsWithLevels(entity.professional.languages) : null;
  entity.professional.expertise ? entity.professional.expertise = normalizeTagsWithLevels(entity.professional.expertise) : null;
  entity.professional.industry ? entity.professional.industry = Tags.service.getTagList(entity.professional.languages) : null;

  return entity.professional;
};

JobApply.achievements = entity => Achievements.getAchievementByOwner(entity._id);

export default JobApply;
