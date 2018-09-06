import Service from "../service"

const Query = {};

Query.paymentLog = (root, {_id}, context) => {
  return Service.getPaymentLog(_id)
};
Query.paymentLogs = (root, {paymentLogs}, context) => {
  let query = paymentLogs || {};
  return Service.paymentLogs(query)
};
export default Query;
