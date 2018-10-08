import * as type from "../../../actions/TopSearchActions/types";

const initial = {
  type: null,
  filters: null
};


export const topSearch = (state = initial, action) => {
  switch (action.type) {
    case type.ON_SEARCH:
      return Object.assign({}, state, action);
    case type.CLEAN_SEARCH:
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
