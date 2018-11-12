import ViewsCount from "../index";
import * as _ from "lodash";
import { GetCollection } from "../../getCollection";
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
    } else if (
      moment(data.actualDate).diff(moment(view.lastView), "hours") >= 24
    ) {
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
    const entityService = GetCollection(entity);
    return entityService.update({ _id: id }, { $inc: { views: 1 } });
  };
}

export default ViewsCountService;
