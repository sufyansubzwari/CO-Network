import Tickets from "../index";
import * as _ from "lodash";

/**
 * @class Tickets Service
 * @summary Tickets Service with business logic
 */
class TicketsService {
  /**
   * @name ticket
   * @summary function for save and update
   * @param {Object} data - Ticket information. If had id then this operation should be an update
   * @return {Object} Ticket
   */
  static ticket = async data => {
    if (_.isUndefined(data._id)) {
      const id = Tickets.collection.insert(data);
      return Tickets.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Tickets.collection.update(id, {$set: data});
      return Tickets.collection.findOne(id);
    }
  };
  /**
   * @name deleteTicket
   * @summary Allow delete an ticket
   * @param {String} id - Ticket id
   * @return {Object} Ticket deleted
   */
  static deleteTicket = async (id) => {
    return await Tickets.collection.remove(id);
  };
  /**
   * @name getTicket
   * @summary Get ticket by id
   * @param {String} _id - Ticket id
   * @return {Object} Ticket
   */
  static getTicket = _id => {
    return Tickets.collection.findOne(_id);
  };
  /**
   * @name getTicketByOwner
   * @summary Get ticket by owner
   * @param {String} owner - Ticket owner
   * @return {Object} Ticket
   */
  static getTicketByOwner = owner => {
    return Tickets.collection.find({owner:owner}).fetch();
  };
  /**
   *@name tickets
   * @summary Get all Tickets
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all Tickets
   */
  static tickets = (query) => {
    return Tickets.collection.find(query, {sort: {createdAt: -1}}).fetch();
  };
}

export default TicketsService;
