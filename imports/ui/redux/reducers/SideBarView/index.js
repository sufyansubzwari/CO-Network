import * as type from "../../../actions/SideBarActions/types";

const initial = {
  status: false,
  type: type.HIDE_SIDEBAR
};

const initialType = {
  entityType: null,
  type: type.CHANGE_ENTITY
};

const initialFilters = {
  type: null,
  entityType: null,
  filters: null,
  text: null,
};

export const sideBarStatus = (state = initial, action) => {
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

export const sideBarEntity = (state = initialType, action) => {
  switch (action.type) {
    case type.CHANGE_ENTITY:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};

export const filterStatus = (state = initialFilters, action) => {
  switch (action.type) {
    case type.SET_FILTERS:
      return Object.assign({}, state, action);
    case type.CLEAN_FILTERS:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
