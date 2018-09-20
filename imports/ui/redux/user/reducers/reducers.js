import { EVENT_UPDATE_USER } from '../types';


/**
 */

export const userState = (state="", action) => {
  switch (action.type) {
    case EVENT_UPDATE_USER:
      return action.status;
    default:
      return state;
  }
};
