import Service from "../service";
import { wrapOperators } from "../../../aux-functions";
import Places from "../../../places";
import Followings from "../../../followings/server/service";
import Followers from "../../../followers/server/service";

const Query = {};

Query.user = (root, { id }, context) => {
  return id ? Service.getUser(id) : null;
};

Query.users = (root, { user, filter, limit }, context) => {
  let query = {};

  if (user) {
    if (user.location) {
      let loc = Places.service.places({
        "location.address": { in: user.location.map(item => item.address) }
      });
      user["_id"] = Object.assign({}, user["_id"], {
        in: loc.map(item => item.owner).filter(item => item !== context.userId)
      });
      delete user.location;
    }
    query = wrapOperators(user);
  }
  if (filter) {
    query = {
      $or: [
        { "profile.name": { $regex: filter, $options: "i" } },
        { "profile.lastName": { $regex: filter, $options: "i" } },
        { "profile.aboutMe.yourPassion": { $regex: filter, $options: "i" } }
      ]
    };
  }

  let limitQuery = limit ? { limit: limit } : {};
  return Service.users(query, limitQuery);
};

Query.usersFieldCounts = async (root, { field }, context) => {
  const { userId } = context;
  return await Service.usersFieldCounts(field, userId);
};

Query.followFollowers = async (root, {}, context) => {
  const { userId } = context;
  const myFollowers = await Followers.getFollower({
    entityId: userId,
    entity: "USER"
  });
  const myFollowings = await Followings.getFollowing({
    entityId: userId,
    entity: "USER"
  });
  return {
    myFollowings:
      myFollowings && myFollowings.followings ? myFollowings.followings : [],
    myFollowers:
      myFollowers && myFollowers.followers ? myFollowers.followers : []
  };
};

export default Query;
