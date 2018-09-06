import Messages from "../index";
import * as _ from "lodash";

/**
 * @class MessagesService
 * @summary Messages Service Service with business logic
 */
class MessagesService {
  /**
   * @name message
   * @summary function for save and update
   * @param {Object} data - message information. If had id then this operation should be an update
   * @return {Object} message
   */
  static message = async data => {
    if (_.isUndefined(data._id)) {
      const id = Messages.collection.insert(data);
      return Messages.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Messages.collection.update(id, {$set: data});
      return Messages.collection.findOne(id);
    }
  };
  /**
   * @name deleteMessage
   * @summary Allow delete a message
   * @param {String} id - message id
   * @return {Object} message deleted
   */
  static deleteMessage = async (id) => {
    return await Messages.collection.remove(id);
  };
  /**
   * @name markAsRead
   * @summary Allow mark a message as read
   * @param {String} id - message id
   * @return {Object} message updated
   */
  static markAsRead = async (id) => {
    let data = Messages.collection.findOne(id);
    data.read = true;
    await Messages.collection.update(id, {$set: data});
    return data;
  };
  /**
   * @name getMessage
   * @summary Get message by id
   * @param {String} _id - message id
   * @return {Object} message
   */
  static getMessage = _id => {
    return Messages.collection.findOne(_id);
  };
  /**
   *@name messages
   * @summary Get all messages
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all messages
   */
  static messages = query => {
    return Messages.collection.find(query).fetch();
  };
}

export default MessagesService;
