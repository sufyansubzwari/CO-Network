import * as types from "./types";

export function isMobileView(status) {
  return {
    type: types.CHANGE_MOBILE_VIEW,
    status
  };
}
