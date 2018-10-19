import Service from "../service";
import { wrapOperators } from "../../../aux-functions";
import Places from "../../../places";
import Colloquiums from "./colloquiums";

const Query = {};

Query.colloquium = (root, { _id }, context) => {
  return Service.getColloquium(_id);
};
Query.colloquiums = (root, { filter, limit, colloquiums }, context) => {
  let query = {};
  if (colloquiums) {
    if (colloquiums.location) {
      let loc = Places.service.matchLocations(colloquiums.location, 0.05);
      colloquiums["_id"] = { $in: loc.map(item => item.owner) };
      delete colloquiums.location;
    }
    query = wrapOperators(colloquiums);
  }
  if (filter) {
    query["$or"] = [
      { title: { $regex: filter, $options: "i" } },
      { description: { $regex: filter, $options: "i" } }
    ];
  }
  let limitQuery = limit ? { limit: limit } : {};
  return Service.colloquiums(query, limitQuery);
};

export default Query;
