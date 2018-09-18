import * as types from "./types";

export function toggleSideBar(status, type, add) {
  return {
    type: status
      ? add
        ? types.SHOW_ADD_SIDEBAR
        : types.SHOW_SIDEBAR
      : add
        ? types.HIDE_ADD_SIDEBAR
        : types.HIDE_SIDEBAR,
    entityType: type || null,
    isAdd: add,
    status: status
  };
}

export function setFilters(type, filters) {
  return {
    type: types.SET_FILTERS,
    entityType: type || null,
    filters: filters
  };
}

export function cleanFilters() {
  return {
    type: types.CLEAN_FILTERS,
    entityType: null,
    filters: null
  };
}
