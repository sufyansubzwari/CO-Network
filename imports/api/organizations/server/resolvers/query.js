import Service from "../service"

const Query = {};

Query.organization = (root, {_id}, context) => {
  return Service.getOrganization(_id)
};
Query.organizations = (root, {organizations, limit}, context) => {
  let query = organizations || {};
  let limitQuery = limit ? {limit: limit} : {};
  return Service.organizations(query, limitQuery)
};
export default Query;
