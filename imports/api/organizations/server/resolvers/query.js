import Service from "../service"

const Query = {};

Query.organization = (root, {_id}, context) => {
  return Service.getOrganization(_id)
};
Query.organizations = (root, {organization, limit}, context) => {
  let query = organization || {};
  let limitQuery = limit || {};
  return Service.organizations(query, limitQuery)
};
export default Query;
