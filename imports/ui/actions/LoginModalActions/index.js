import * as types from "./types";

export function loginModalShow() {
  return {
    type: types.LOGIN_MODAL_SHOW,
    show: true
  };
}

export function loginModalHide() {
  return {
    type: types.LOGIN_MODAL_HIDEN,
    show: false
  };
}
