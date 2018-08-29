import Requirements from "../index";
import * as _ from "lodash";
/**
 * @class Requirement Service
 * @summary Requirement Service with business logic
 */
class RequirementService {
  /**
   * @name requirement
   * @summary function for save and update
   * @param {Object} data - Requirement information. If had id then this operation should be an update
   * @return {Object} Requirement
   */
  static requirement = async data => {
    if (_.isUndefined(data.id)) {
      const RequirementId = Requirements.collection.insert(data);
      return Requirements.collection.findOne(RequirementId);
    } else {
      await Requirements.collection.update(data.id, { $set: data });
      return Requirements.collection.findOne(data.id);
    }
  };
  /**
   * @name  requirementByProject
   * @summary Get all requirement by project
   * @param {String} id - Project id
   * @return [{Object}] Return all requirement
   */
  static requirementByProject = async id => {
    return await Requirements.collection.find({project_id:id}).fetch();
  };
}

export default RequirementService;
