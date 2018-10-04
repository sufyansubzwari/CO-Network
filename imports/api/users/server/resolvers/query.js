import Service from "../service";
import { wrapOperators } from "../../../aux-functions";
import Places from "../../../places";

const Query = {};

Query.user = (root, { id }, context) => {
  return id ? Service.getUser(id) : null;
};

Query.users = (root, { user, filter, limit }, context) => {
  let query = {};

  if (user) {
    if (user.location) {
      console.log(user.location.map(item => item.address));
      let loc = Places.service.places({
        "location.address": { $in: user.location.map(item => item.address) }
      });
      user["_id"] = { $in: loc.map(item => item.owner).filter(item => item !== context.userId) };
      delete user.location;
    }
    query = wrapOperators(user);
  }
  if (filter) {
    query = {
      $or: [
        { 'profile.name': { $regex: filter, $options: "i" } },
        { 'profile.lastName': { $regex: filter, $options: "i" } },
        { 'profile.aboutMe.yourPassion': { $regex: filter, $options: "i" } }
      ]
    };
  }

  let limitQuery = limit ? {limit:limit} : {};
  return Service.users(query, limitQuery);
};

Query.usersFieldCounts = async (root, { field }, context) => {
  const {userId} = context;
  return await Service.usersFieldCounts(field, userId);
};

export default Query;
