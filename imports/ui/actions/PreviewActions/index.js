import * as types from "./types";

export function PreviewData(data, index, type) {
  return {
    showPreview: !!data,
    entity: data,
    entityType: type,
    type: data ? types.SHOW_PREVIEW : types.HIDE_PREVIEW
  };
}
