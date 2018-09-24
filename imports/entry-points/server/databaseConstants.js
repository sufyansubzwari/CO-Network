import Tags from "../../api/tags";
import { INDUSTRY_SECTOR_OPTIONS } from "../../ui/modules/user-module/form/constants/constants";

// Insert industry tags

INDUSTRY_SECTOR_OPTIONS.forEach(({ label, value }) => {
  const tagExists = Tags.collection.findOne({ label: label });

  // In case tag already exists, do nothing
  if (tagExists) {
    return;
  }
  // Otherwise, insert tag
  Tags.service.tag({ label, value, type: "INDUSTRY", name: label });
});
