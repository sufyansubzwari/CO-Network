import StripeCustomer from "../index";
import * as _ from "lodash";

/**
 * @class StripeCustomer
 * @summary StripeCustomer Service with business logic
 */
class StripeCustomerService {
  /**
   * @name stripeCustomer
   * @summary function for save and update
   * @param {Object} data - stripeCustomer information. If had id then this operation should be an update
   * @return {Object} stripeCustomer
   */
  static stripeCustomer = async data => {
    if (_.isUndefined(data._id)) {
      const id = StripeCustomer.collection.insert(data);
      return StripeCustomer.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await StripeCustomer.collection.update(id, {$set: data});
      return StripeCustomer.collection.findOne(id);
    }
  };
  /**
   * @name deleteStripeCustomer
   * @summary Allow delete an stripeCustomer
   * @param {String} id - stripeCustomers id
   * @return {Object} stripeCustomers deleted
   */
  static deleteStripeCustomer = async (id) => {
    return await StripeCustomer.collection.remove(id);
  };
  /**
   * @name getStripeCustomer
   * @summary Get stripeCustomers by id
   * @param {String} _id - stripeCustomers id
   * @return {Object} StripeCustomers
   */
  static getStripeCustomer = _id => {
    return StripeCustomer.collection.findOne(_id);
  };
  /**
   *@name stripeCustomers
   * @summary Get all stripeCustomers
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all stripeCustomers
   */
  static stripeCustomers = query => {
    return StripeCustomer.collection.find(query).fetch();
  };
}

export default StripeCustomerService;
