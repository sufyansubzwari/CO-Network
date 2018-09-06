import Events from "../index";
import * as _ from "lodash";

/**
 * @class Event Service
 * @summary Event Service with business logic
 */
class EventsService {
  /**
   * @name event
   * @summary function for save and update
   * @param {Object} data - Event information. If had id then this operation should be an update
   * @return {Object} Event
   */
  static event = async data => {
    if (_.isUndefined(data._id)) {
      const id = Events.collection.insert(data);
      return Events.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Events.collection.update(id, {$set: data});
      return Events.collection.findOne(id);
    }
  };
  /**
   * @name deleteEvent
   * @summary Allow delete an event
   * @param {String} id - Event id
   * @return {Object} Event deleted
   */
  static deleteEvent = async (id) => {
    return await Events.collection.remove(id);
  };
  /**
   * @name updateImage
   * @summary Allow update image to an event
   * @param {String} id - Event id
   * @param {String} image - Event image
   * @return {Object} Event updated
   */
  static updateImage = async (id, image) => {
    await Events.collection.update(id, {
      $addToSet: {image: image}
    });
    return await Events.collection.findOne(id);
  };
  /**
   * @name getEvent
   * @summary Get event by id
   * @param {String} _id - Event id
   * @return {Object} Event
   */
  static getEvent = _id => {
    return Events.collection.findOne(_id);
  };
  /**
   *@name events
   * @summary Get all events
   * @param {Object} query - query parameters
   * @return {Object}||[{Object }] Return one or all events
   */
  static events = query => {
    let events= Events.collection.find(query).fetch();
    return events;
  };
}

export default EventsService;
