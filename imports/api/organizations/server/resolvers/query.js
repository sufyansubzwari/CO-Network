import Service from "../service"

const Query = {};

Query.organization = (root, {_id}, context) => {
  return Service.getOrganization(_id)
};
Query.organizations = (root, {organization}, context) => {
  let query = {};
  if (organization) {
    query = organization;
  }
  return Service.organizations(query)
};
export default Query;
