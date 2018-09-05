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

}

export default UserService;
