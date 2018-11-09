import Service from "../service";

const Query = {};

Query.stripeCustomer = (root, { _id }, context) => {
  return Service.getStripeCustomer(_id);
};
Query.stripeCustomers = (root, { stripeCustomer }, context) => {
  let query = stripeCustomer ? { ...stripeCustomer } : {};
  return Service.stripeCustomers(query);
};

export default Query;
