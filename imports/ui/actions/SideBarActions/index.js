import * as types from "./types";

export function toggleSideBar(status, add, profile, notifications, messages) {
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
    profile: profile && !add,
    notifications: notifications,
    messages: messages
  };
}

export function setFilterEntity(type) {
  return {
    type: types.CHANGE_ENTITY,
    entityType: type || null
  };
}

export function setFilters(type, filters, text) {
  return {
    type: types.SET_FILTERS,
    entityType: type || null,
    filters: filters,
    text: text
  };
}

export function cleanFilters() {
  return {
    type: types.CLEAN_FILTERS,
    entityType: null,
    filters: null,
    text: null
  };
}
