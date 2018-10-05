import * as types from "./types";

export function toggleSideBar(status, add, profile) {
  return {
    type: status
      ? add
        ? types.SHOW_ADD_SIDEBAR
        : types.SHOW_SIDEBAR
      : add
        ? types.HIDE_ADD_SIDEBAR
        : types.HIDE_SIDEBAR,
    isAdd: add,
    status: status,
      profile: profile && !add
  };
}

export function setFilterEntity(type) {
  return {
    type: types.CHANGE_ENTITY,
    entityType: type || null
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
