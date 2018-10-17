import { combineReducers } from "redux";
import {
  sideBarStatus,
  filterStatus,
  sideBarEntity
} from "./reducers/SideBarView";
import { topSearch } from "./reducers/TopSearch";
import previewData from "./reducers/PreviewActions";
import loginModal from "./reducers/LoginModal/LoginModal";
import isChatView from "./reducers/ChatView/ChatView";
import isMobile from "./reducers/IsMobileView";
import User from "./user";

const rootReducer = combineReducers({
  ...User.reducers,
  filterStatus,
  sideBarStatus,
  previewData,
  sideBarEntity,
  loginModal,
  isChatView,
  topSearch,
  isMobile
});

export default rootReducer;
