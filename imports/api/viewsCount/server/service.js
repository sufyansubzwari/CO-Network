import ViewsCount from "../index";
import * as _ from "lodash";
import User from "../../users/server/collection";
import Org from "../../organizations/server/collection";
import Jobs from "../../jobs/server/collection";
import Events from "../../events/server/collection";
import Colloquiums from "../../colloquiums/server/collection";
import moment from "moment";

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
    } else if (moment(data.actualDate).diff(moment(view.lastView), 'hours') >= 24) {
      let id = view._id;
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
    return entityService.update({ _id: id }, { $inc: { views: 1 } });
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
