import Organizations from "../index";
import * as _ from "lodash";

/**
 * @class Organization Service
 * @summary Organization Service with business logic
 */
class OrganizationsService {
  /**
   * @name organization
   * @summary function for save and update
   * @param {Object} data - organization information. If had id then this operation should be an update
   * @return {Object} Organization
   */
  static organization = async data => {
    if (_.isUndefined(data._id)) {
      const id = Organizations.collection.insert(data);
      return Organizations.collection.findOne(id);
    } else {
      let id = data._id;
      delete data._id;
      await Organizations.collection.update(id, { $set: data });
      return Organizations.collection.findOne(id);
    }
  };
  /**
   * @name deleteOrganization
   * @summary Allow delete an organization
   * @param {String} id - Organization id
   * @return {Object} Organization deleted
   */
  static deleteOrganization = async id => {
    return await Organizations.collection.remove(id);
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
    const organization = await Organizations.collection.findOne(id);
    if (image)
      await Organizations.collection.update(id, {
        $set: { image: image }
      });
    if (cover)
      await Organizations.collection.update(id, {
        $set: { cover: cover }
      });
    return await Organizations.collection.findOne(id);
  };
  /**
   * @name getOrganization
   * @summary Get organization by id
   * @param {String} _id - Organizations id
   * @return {Object} Organization
   */
  static getOrganization = _id => {
    return Organizations.collection.findOne(_id);
  };
  /**
   *@name organizations
   * @summary Get all organizations
   * @param {Object} query - query parameters
   * @param {Object} limit - query limit parameter
   * @return {Object}||[{Object }] Return one or all organizations
   */
  static organizations = (query, limit) => {
    return Organizations.collection
      .find(query, { ...limit, sort: { createdAt: -1 } })
      .fetch();
  };
}

export default OrganizationsService;
