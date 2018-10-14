import * as type from "../../../actions/ChatView/types";

const initial = {
  show: false,
  type: type.CLOSE_CHAT_VIEW
};

const isChatView = (state = initial, action) => {
  switch (action.type) {
    case type.OPEN_CHAT_VIEW:
      return Object.assign({}, state, action);
    case type.CLOSE_CHAT_VIEW:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default isChatView;
