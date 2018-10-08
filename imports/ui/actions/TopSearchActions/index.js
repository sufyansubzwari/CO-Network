import * as types from "./types";

export function onSearchTags(tag) {
  return {
    type: types.ON_SEARCH,
    tag: tag
  };
}

export function cleanSearch() {
  return {
    type: types.CLEAN_SEARCH,
    tag: null
  };
}
