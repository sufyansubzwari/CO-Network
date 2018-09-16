import Service from "../service";

const Query = {};

Query.organization = (root, { _id }, context) => {
  return Service.getOrganization(_id);
};
Query.organizations = (root, { filter, limit }, context) => {
  let query = {};
  if (filter) {
    query = {
      $or: [
        { "info.name": { $regex: filter, $options: "i" } },
        { "reason.bio": { $regex: filter, $options: "i" } },
        { "reason.vision": { $regex: filter, $options: "i" } },
      ]
    };
  }
  let limitQuery = limit ? { limit: limit } : {};
  return Service.organizations(query, limitQuery);
}

export default Query;
