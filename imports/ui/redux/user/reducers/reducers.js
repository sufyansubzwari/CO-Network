import { EVENT_UPDATE_USER } from '../types';


/**
 */

export const userState = (state="123", action) => {
  switch (action.type) {
    case EVENT_UPDATE_USER:
      return action.status;
    default:
      return state;
  }
};
