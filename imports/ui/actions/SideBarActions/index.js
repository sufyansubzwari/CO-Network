import * as types from "./types";

export function toggleSideBar(status, type, add) {
  return {
    type: status ? add ? types.SHOW_ADD_SIDEBAR : types.SHOW_SIDEBAR : add ? types.HIDE_ADD_SIDEBAR : types.HIDE_SIDEBAR,
    entityType: type || null,
    isAdd: add,
    status: status
  };
}
