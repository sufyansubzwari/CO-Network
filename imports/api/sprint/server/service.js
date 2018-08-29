import Sprints from "../index";
import * as _ from "lodash";
import Project from '../../projects/server/resolvers/project';
/**
 * @class Sprint Service
 * @summary Sprint Service with business logic
 */
class SprintService {
  /**
   * @name sprint
   * @summary function for save and update
   * @param {Object} data - Sprint information. If had id then this operation should be an update
   * @return {Object} Sprint
   */
  static sprint = async data => {
    if (_.isUndefined(data.id)) {
      const SprintId = Sprints.collection.insert(data);
      return Sprints.collection.findOne(SprintId);
    } else {
      await Sprints.collection.update(data.id, { $set: data });
      return Sprints.collection.findOne(data.id);
    }
  };
  /**
   * @name currentSprintByProject
   * @summary Get current sprint by project
   * @param {String} id - Sprint id
   * @return {Object} Sprint
   */
  static currentSprintByProject = async id => {
    const data = await Sprints.collection
      .find(
        { project_id: id, status: "Open" },
      )
      .fetch();
    return data[0];
  };
  /**
   * @name sprintByProject
   * @summary Get all sprint by project
   * @param {String} id - Sprint id
   * @return {Object} Sprint
   */
  static sprintByProject = async id => {
    const data = await Sprints.collection
      .find(
        { project_id: id },
      )
      .fetch();
    return data;
  };

}

export default SprintService;
