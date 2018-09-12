import * as type from "../../../actions/LoginModalActions/types";

const initial = {
  show: false
};

const loginModal = (state = initial, action) => {
  switch (action.type) {
    case type.LOGIN_MODAL_SHOW:
      return Object.assign({}, state, action);
    case type.LOGIN_MODAL_HIDEN:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default loginModal;
