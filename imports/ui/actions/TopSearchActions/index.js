import * as types from "./types";

export function onSearchTags(filters) {
  return {
    type: types.ON_SEARCH,
    filters: filters
  };
}

export function cleanSearch() {
  return {
    type: types.CLEAN_SEARCH,
    filters: null
  };
}
