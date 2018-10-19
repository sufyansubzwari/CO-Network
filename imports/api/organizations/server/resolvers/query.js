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
      let loc = Places.service.matchLocations(organizations.location, 0.10);
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

Query.orgFilters = async (root, { owner }, context) => {
  const myOrg = await Service.organizations({ owner: owner }, {fields: {_id: 1 }}).map(item => item._id);
  const hosting = await Service.organizations({'services.hostEvents': true}, {fields: {_id: 1 }}).map(item => item._id);
  return {
    myOrg,
    hosting
  };
};

export default Query;
