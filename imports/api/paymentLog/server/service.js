import PaymentLog from "../index";
import * as _ from "lodash";

/**
 * @class PaymentLog
 * @summary PaymentLog Service with business logic
 */
class PaymentLogService {
  /**
   * @name paymentLog
   * @summary function for save and update
   * @param {Object} data - PaymentLog information. If had id then this operation should be an update
   * @return {Object} PaymentLog
   */
  static paymentLog = async data => {
    if (_.isUndefined(data._id)) {
      const id = PaymentLog.collection.insert(data);
      return PaymentLog.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await PaymentLog.collection.update(id, {$set: data});
      return PaymentLog.collection.findOne(id);
    }
  };
  /**
   * @name deletePaymentLog
   * @summary Allow delete a PaymentLog
   * @param {String} id - PaymentLog id
   * @return {Object} PaymentLog deleted
   */
  static deletePaymentLog = async (id) => {
    return await PaymentLog.collection.remove(id);
  };
  /**
   * @name getPaymentLog
   * @summary Get PaymentLog by id
   * @param {String} _id - PaymentLog id
   * @return {Object} PaymentLog
   */
  static getPaymentLog = _id => {
    return PaymentLog.collection.findOne(_id);
  };
  /**
   *@name paymentLogs
   * @summary Get all PaymentLogs
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all PaymentLogs
   */
  static paymentLogs = query => {
    return PaymentLog.collection.find(query).fetch();
  };
}

export default PaymentLogService;
