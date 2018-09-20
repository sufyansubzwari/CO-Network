import { combineReducers } from "redux";
import {
  sideBarStatus,
  filterStatus,
  sideBarEntity
} from "./reducers/SideBarView";
import previewData from "./reducers/PreviewActions";
import loginModal from "./reducers/LoginModal/LoginModal";

const rootReducer = combineReducers({
  filterStatus,
  sideBarStatus,
  previewData,
  sideBarEntity,
  loginModal
});

export default rootReducer;
