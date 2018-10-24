import Service from "../service"
import {wrapOperators} from '../../../aux-functions';

const Query = {};

Query.sponsor = (root, {_id}, context) => {
  return Service.getSponsor(_id)
};

Query.sponsors = (root, {filter, limit, sponsors}, context) => {
  let query = {};
  if (sponsors) {

    query = wrapOperators(sponsors);
    // console.log(query);
  }
  let limitQuery = limit ? {limit: limit} : {};
  return Service.sponsors(query, limitQuery)
};


export default Query;
