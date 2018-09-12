import * as type from "../../../actions/UserActions/types";

const initial = {};

const user = (state = initial, action) => {
  switch (action.type) {
    case type.ON_LOGIN:
      return Object.assign({}, state, action);
    case type.ON_LOGOUT:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default user;
