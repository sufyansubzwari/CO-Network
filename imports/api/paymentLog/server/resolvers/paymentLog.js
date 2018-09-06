import Service from "../service";
import Users from "../../../users";

const PaymentLog = {};

PaymentLog.owner = entity => {
  return Users.service.getUser(entity.owner);
};

export default PaymentLog;
