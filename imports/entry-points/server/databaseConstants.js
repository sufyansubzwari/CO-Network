import Tags from "../../api/tags";
import {
  EVENT_CATEGORIES,
  DOMAIN_EXPERT,
  LANGUAGES_LIBRARIES
} from "../../ui/constants";

// Insert industry tags

DOMAIN_EXPERT.forEach(({ label, value }) => {
  const tagExists = Tags.collection.findOne({ label: label });

  // In case tag already exists, do nothing
  if (tagExists) {
    return;
  }
  // Otherwise, insert tag
  Tags.service.tag({ label, value, type: "INDUSTRY", name: label });
});

EVENT_CATEGORIES.forEach(({ label, value }) => {
  const tagExists = Tags.collection.findOne({ label: label });

  // In case tag already exists, do nothing
  if (tagExists) {
    return;
  }
  // Otherwise, insert tag
  Tags.service.tag({ label, value, type: "EVENT", name: label });
});

LANGUAGES_LIBRARIES.forEach(({ label, value }) => {
  const tagExists = Tags.collection.findOne({ label: label });

  // In case tag already exists, do nothing
  if (tagExists) {
    return;
  }
  // Otherwise, insert tag
  Tags.service.tag({ label, value, type: "Languages", name: label });
});
