import Service from "../service";
import {wrapOperators} from "../../../aux-functions";
import Places from "../../../places";

const Query = {};

Query.organization = (root, { _id }, context) => {
  return Service.getOrganization(_id);
};
Query.organizations = (root, { filter, limit, organizations }, context) => {
  let query = {};
  if(organizations){
    if (organizations.location) {
      console.log(organizations.location.map(item => item.address));
      let loc = Places.service.places({'location.address': {"$in": organizations.location.map(item => item.address)}});
      organizations["_id"] = {"$in": loc.map(item => item.owner)};
      delete organizations.location;
    }
    query = wrapOperators(organizations);
  }
  if (filter) {
    query['$or'] =[
      { "name": { $regex: filter, $options: "i" } },
      { "reason.bio": { $regex: filter, $options: "i" } },
      { "reason.vision": { $regex: filter, $options: "i" } },
    ]
  }
  let limitQuery = limit ? { limit: limit } : {};
  return Service.organizations(query, limitQuery);
}

export default Query;
