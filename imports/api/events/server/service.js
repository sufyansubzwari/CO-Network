import Events from "../index";

/**
 * @class Event Service
 * @summary Event Service with business logic
 */
class EventsService {
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
    return Events.collection.find(query).fetch();
  };
}

export default EventsService;
