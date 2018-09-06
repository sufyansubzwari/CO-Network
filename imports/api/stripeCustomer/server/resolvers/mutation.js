import Service from "../service";

const Mutation = {};

Mutation.stripeCustomer = async (root, {stripeCustomer}, context) => {
  return Service.stripeCustomer(stripeCustomer);
};

Mutation.deleteStripeCustomer = async (root, {_id}, context) => {
  return Service.deleteStripeCustomer(_id);
};


export default Mutation;
