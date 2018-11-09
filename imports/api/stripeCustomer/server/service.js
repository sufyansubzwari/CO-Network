import StripeCustomer from "../index";
import * as _ from "lodash";

/**
 * @class StripeCustomer Service
 * @summary StripeCustomer Service with business logic
 */
class StripeCustomerService {
  /**
   * @name notification
   * @summary function for save and update
   * @param {Object} data - StripeCustomer information. If had id then this operation should be an update
   * @return {Object} StripeCustomer
   */
  static stripeCustomer = async data => {
    if (_.isUndefined(data._id)) {
      const id = StripeCustomer.collection.insert(data);
      return StripeCustomer.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await StripeCustomer.collection.update(id, { $set: data });
      return StripeCustomer.collection.findOne(id);
    }
  };
  /**
   * @name deleteStripeCustomer
   * @summary Allow delete an StripeCustomer
   * @param {String || Object} id - StripeCustomer id
   * @return {Object} StripeCustomer deleted
   */
  static deleteStripeCustomer = async id => {
    return await StripeCustomer.collection.remove(id);
  };
  /**
   * @name getStripeCustomer
   * @summary Get StripeCustomer by id
   * @param {String || Object} _id - StripeCustomer id
   * @return {Object} Return one StripeCustomer
   */
  static getStripeCustomer = _id => {
    return StripeCustomer.collection.findOne(_id);
  };
  /**
   *@name stripeCustomers
   * @summary Get all StripeCustomer
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all StripeCustomer
   */
  static stripeCustomers = query => {
    return StripeCustomer.collection
      .find(query, { sort: { createdAt: -1 } })
      .fetch();
  };
}

export default StripeCustomerService;
