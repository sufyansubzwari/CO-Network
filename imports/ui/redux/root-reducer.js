import { combineReducers } from "redux";
import sideBarStatus, {filterStatus} from "./reducers/SideBarView";
import previewData from "./reducers/PreviewActions";
import loginModal from "./reducers/LoginModal/LoginModal";

const rootReducer = combineReducers({
  // page: pageReducer,
  // ...add all your individual reducers here
  filterStatus,
  sideBarStatus,
  previewData,
  loginModal
});

export default rootReducer;
