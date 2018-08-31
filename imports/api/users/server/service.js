import Users from "../index";
import Tasks from "../../task";
import * as _ from "lodash";

/**
 * @class User Service
 * @summary Users Service with business logic
 */
class UserService {
  /**
   * @name user
   * @summary function for save and update
   * @param {Object} data - User information. If had id then this operation should be an update
   * @return {Object} Users
   */
  static user = async data => {
    if (_.isUndefined(data._id)) {
      const UsersId = Users.collection.insert(data);
      return Users.collection.findOne(UsersId);
    } else {
      let id=data._id;
      delete data._id;
      await Users.collection.update(id, { $set: data });
      return Users.collection.findOne(id);
    }
  };
  /**
   * @name getUser
   * @summary Get Users by id
   * @param {String} _id - User id
   * @return {Object} User
   */
  static getUser = _id => {
    return Users.collection.findOne(_id);
  };
  /**
   *@name users
   * @summary Get all Users
   * @param {Object} query - query parameters
   * @return {Object} | [{Object }] Return one or all Users
   */
  static users = query => {
    return Users.collection.find(query).fetch();
  };
  /**
   *@name report
   * @summary Get user work reports
   * @param {String} user_id - User id
   * @param {String} project_id - Project id
   * @param {Date} startDate - start date filter
   * @param {Date} endDate - end date filter
   * @return {Object} | [{Object }] Return all project with planned hours and log
   */
  static report=(user_id,project_id,startDate,endDate) =>{
    return Tasks.service.getTaskReport(user_id, project_id, startDate, endDate)
  };

}

export default UserService;
