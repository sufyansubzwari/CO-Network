// Users namespace user resolvers
import Tags from "../../../tags";
import Places from "../../../places";
import Achievements from "../../../archivements/server/service";

const User = {};

//------------------------------------------------------------------------------
// We need to tell graphql how to resolve the 'services' field inside the User
// query. We could also define resolver functions for the rest of the User
// fields, but if we don't do that graphql will default to the field values,
// which is exactly what we want.
User.services = (root, args, context) => {
    // Get current user
    const { user } = context;

    // In case user is not logged in, return no services
    if (!user) {
        return [];
    }

    // TODO: we should only return current loggedIn service instead of all
    // available services
    return (user.services && Object.keys(user.services)) || [];
};
//------------------------------------------------------------------------------

User.profile = entity => {
  entity.profile.knowledge && entity.profile.knowledge.languages ? entity.profile.knowledge.languages = Tags.service.getTagList(entity.profile.knowledge.languages) : null;
  entity.profile.knowledge && entity.profile.knowledge.curiosity ? entity.profile.knowledge.curiosity = Tags.service.getTagList(entity.profile.knowledge.curiosity) : null;
  entity.profile.professional && entity.profile.professional.industry ? entity.profile.professional.industry = Tags.service.getTagList(entity.profile.professional.industry) : null;
  entity.profile.speaker && entity.profile.speaker.otherpreferred ? entity.profile.speaker.otherpreferred = Tags.service.getTagList(entity.profile.speaker.otherpreferred) : null;
  entity.profile.speaker && entity.profile.speaker.topic ? entity.profile.speaker.topic = Tags.service.getTagList(entity.profile.speaker.topic) : null;
  entity.profile.speaker && entity.profile.speaker.otherlooking ? entity.profile.speaker.otherlooking = Tags.service.getTagList(entity.profile.speaker.otherlooking) : null;
  entity.profile.place = Places.service.getPlaceByOwner(entity._id);
  entity.profile.achievements = Achievements.getAchievementByOwner(entity._id);

  return entity.profile

};

export default User;