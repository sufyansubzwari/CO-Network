import * as types from "./types";

export function closeChatView() {
  return {
    type: types.CLOSE_CHAT_VIEW,
    show: false
  };
}

export function openChatView() {
  return {
    type: types.OPEN_CHAT_VIEW,
    show: true
  };
}
