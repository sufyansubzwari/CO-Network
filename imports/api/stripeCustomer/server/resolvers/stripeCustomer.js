import Service from "../service";
import Users from "../../../users";

const StripeCustomer = {};

StripeCustomer.owner = entity => {
  return Users.service.getUser(entity.owner);
};

export default StripeCustomer;
