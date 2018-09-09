import * as type from "../../../actions/PreviewActions/types";

const initial = {
  showPreview: false,
  entity: null,
  entityType: ""
};

const previewData = (state = initial, action) => {
  switch (action.type) {
    case type.SHOW_PREVIEW:
      return Object.assign({}, state, action);
    case type.HIDE_PREVIEW:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
export default previewData;
