import Service from "../service";

const Mutation = {};

Mutation.paymentLog = async (root, {paymentLog}, context) => {
  return Service.paymentLog(paymentLog);
};

Mutation.deletePaymentLogs = async (root, {_id}, context) => {
  return Service.deletePaymentLog(_id);
};


export default Mutation;
