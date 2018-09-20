import { combineReducers } from "redux";
import sideBarStatus, {filterStatus} from "./reducers/SideBarView";
import previewData from "./reducers/PreviewActions";
import loginModal from "./reducers/LoginModal/LoginModal";
import User from "./user";

const rootReducer = combineReducers({
  // page: pageReducer,
  // ...add all your individual reducers here
  ...User.reducers,
  filterStatus,
  sideBarStatus,
  previewData,
  loginModal
});

export default rootReducer;
