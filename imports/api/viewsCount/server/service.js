import ViewsCount from "../index";
import * as _ from "lodash";
import User from "../../users";
import Org from "../../organizations";
import Jobs from "../../jobs";
import Events from "../../events";
import Colloquiums from "../../colloquiums";

/**
 * @class ViewsCount Service
 * @summary viewsCount Service with business logic
 */
class ViewsCountService {
  /**
   * @name viewUpdate
   * @summary function for save and update
   * @param {Object} data - view information. If had id then this operation should be an update
   * @return {Object} tag
   */
  static viewUpdate = async data => {
    let view = ViewsCount.collection.findOne({
      user: data.user,
      entityViewed: data.entityViewed
    });
    if (_.isUndefined(data._id) && !view) {
      data.lastView = data.actualDate;
      delete data.actualDate;
      const id = ViewsCount.collection.insert(data);
      ViewsCountService.updateEntity(data.entityViewed, data.entityType);
      return ViewsCount.collection.findOne(id);
    } else if (data.actualDate.getDate() + 1 - view.lastView >= 24) {
      let id = data._id || tags._id;
      data._id ? delete data._id : null;
      data.lastView = data.actualDate;
      delete data.actualDate;
      await ViewsCount.collection.update(id, { $set: data });
      ViewsCountService.updateEntity(data.entityViewed, data.entityType);
      return ViewsCount.collection.findOne(id);
    }
    return null;
  };
  static updateEntity = (id, entity) => {
    const entityService = ViewsCountService.getCollection(entity);
    return entityService.collection.update({ _id: id }, { $inc: { views: 1 } });
  };

  static getCollection = entity => {
    if (entity)
      switch (entity) {
        case "USER":
          return User;
        case "JOB":
          return Jobs;
        case "EVENT":
          return Events;
        case "ORGANIZATION":
          return Org;
        case "COLLOQUIUM":
          return Colloquiums;
      }
    return User;
  };
}

export default ViewsCountService;
