import { CHANGE_MOBILE_VIEW } from "../../../actions/IsMobileView/types";

export const isMobile = (state = false, action) => {
  switch (action.type) {
    case CHANGE_MOBILE_VIEW:
      return action.status || false;
    default:
      return state;
  }
};
export default isMobile;
