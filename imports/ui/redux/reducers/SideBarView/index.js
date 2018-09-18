import * as type from "../../../actions/SideBarActions/types";

const initial = {
  status: false,
  type: type.HIDE_SIDEBAR,
  entityType: null
};

const initialFilters = {
  type: null,
  entityType: null,
  filters: null,
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

export const filterStatus = (state = initialFilters, action) => {
  console.log(action.type, state);
  switch (action.type) {
    case type.SET_FILTERS:
      return Object.assign({}, state, action);
    case type.CLEAN_FILTERS:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

export default sideBarStatus;
