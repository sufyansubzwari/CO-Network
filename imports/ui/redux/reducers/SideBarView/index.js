import * as type from "../../../actions/SideBarActions/types";

const initial = {
  status: false,
  type: type.HIDE_SIDEBAR,
  entityType: null
};

const sideBarStatus = (state = initial, action) => {
  switch (action.type) {
    case type.SHOW_SIDEBAR:
      return Object.assign({}, state, action);
    case type.HIDE_SIDEBAR:
      return Object.assign({}, state, action);
    case type.SHOW_ADD_SIDEBAR:
      return Object.assign({}, state, action);
    case type.HIDE_ADD_SIDEBAR:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default sideBarStatus;
