import Service from "../service"

const Query = {};

Query.message = (root, {_id}, context) => {
  return Service.getMessage(_id)
};
Query.messages = (root, {messages}, context) => {
  let query = {};
  if (messages) {
    query = messages;
  }
  return Service.messages(query)
};
export default Query;
