import Service from "../service";

const Mutation = {};

Mutation.stripeCustomer = async (root, {stripeCustomer}, context) => {
  return Service.stripeCustomer(stripeCustomer);
};

Mutation.deleteStripeCustomer = async (root, {id}, context) => {
  return Service.deleteStripeCustomer(id);
};


export default Mutation;
