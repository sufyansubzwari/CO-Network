import Colloquiums from "../index";
import * as _ from "lodash";
import Notifications from "../../notifications";

/**
 * @class Colloquium Service
 * @summary Colloquium Service with business logic
 */
class ColloquiumsService {
  /**
   * @name colloquium
   * @summary function for save and update
   * @param {Object} data - colloquium information. If had id then this operation should be an update
   * @return {Object} Colloquium
   */
  static colloquium = async data => {
    if (_.isUndefined(data._id)) {
      const id = Colloquiums.collection.insert(data);
      Notifications.service.generateNotification("POST", id, "COLLOQUIUM", data.owner, data.title);
      return Colloquiums.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Colloquiums.collection.update(id, { $set: data });
      Notifications.service.generateNotification("UPDATE", id, "COLLOQUIUM", data.owner, data.title);
      return Colloquiums.collection.findOne(id);
    }
  };
  /**
   * @name deleteColloquium
   * @summary Allow delete an colloquium
   * @param {String} id - Colloquium id
   * @return {Object} Colloquium deleted
   */
  static deleteColloquium = async id => {
    const entity = Colloquiums.collection.findOne(id);
    await Colloquiums.collection.remove(id);
    Notifications.service.generateNotification("DELETE", id, entity.entity, entity.owner, entity.title);
    return id;
  };
  /**
   * @name updateImage
   * @summary Allow update image to an event
   * @param {String} id - Event id
   * @param {String} image - image
   * @param {String} cover - cover
   * @return {Object} Event updated
   */
  static updateImage = async (id, image, cover) => {
    const colloquium = await Colloquiums.collection.findOne(id);
    if (image)
      await Colloquiums.collection.update(id, {
        $set: { image: image }
      });
    if (cover)
      await Colloquiums.collection.update(id, {
        $set: { cover: cover }
      });
    return await Colloquiums.collection.findOne(id);
  };
  /**
   * @name getColloquium
   * @summary Get colloquium by id
   * @param {String} _id - Colloquiums id
   * @return {Object} Colloquium
   */
  static getColloquium = _id => {
    return Colloquiums.collection.findOne(_id);
  };
  /**
   *@name colloquiums
   * @summary Get all colloquiums
   * @param {Object} query - query parameters
   * @param {Object} limit - query limit parameter
   * @return {Object}||[{Object }] Return one or all colloquiums
   */
  static colloquiums = (query, limit) => {
    return Colloquiums.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };
}

export default ColloquiumsService;
