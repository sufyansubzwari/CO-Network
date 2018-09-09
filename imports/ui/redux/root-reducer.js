import { combineReducers } from "redux";
import sideBarStatus from "./reducers/SideBarView";
import previewData from "./reducers/PreviewActions";

const rootReducer = combineReducers({
  // page: pageReducer,
  // ...add all your individual reducers here
  sideBarStatus,
  previewData
});

export default rootReducer;
