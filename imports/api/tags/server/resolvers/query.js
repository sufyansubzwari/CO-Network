import Service from "../service";
const Query = {};

Query.tag = (root, { _id }, context) => {
  return Service.getTag(_id);
};
Query.tags = (root, { tags, limit }, context) => {
  let query = tags || {};
  let limitQuery = limit ? { limit: limit } : {};
  return Service.tags(query, limitQuery).sort((a, b) => b.used - a.used);
};

Query.tagsFilters = async (root, { type, entity, field }, context) => {
  let tags = await Service.tagsFilters(type, entity, field);
  return tags.sort((a, b) => b.number - a.number);
};

export default Query;
