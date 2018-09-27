import { EVENT_UPDATE_USER } from "../types";

/**
 */

export const userState = (state = null, action) => {
  switch (action.type) {
    case EVENT_UPDATE_USER:
      return action.status || null;
    default:
      return state;
  }
};
