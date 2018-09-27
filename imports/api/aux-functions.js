import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Tags from "./tags";

/**
 * @namespace AuxFunctions
 */
const AuxFunctions = {};

//------------------------------------------------------------------------------
/**
 * @summary Display alert message after ms milliseconds.
 */
AuxFunctions.delayedAlert = (msg, ms) => {
  check(msg, String);
  check(ms, Number);

  const handler = Meteor.setTimeout(() => {
    alert(msg); // eslint-disable-line no-alert
    Meteor.clearTimeout(handler);
  }, ms);
};
//------------------------------------------------------------------------------

const operators = [
  "and",
  "or",
  "ne",
  "lte",
  "gte",
  "gt",
  "gt",
  "contains",
  "notContains",
  "between",
  "beginsWith",
  "regex",
  "elemMatch",
  "in"
];
const nestedDocs = "_DOT_";

export const wrapOperators = json => {
  if (typeof json === "object" && !(json instanceof Date)) {
    let shadowCopy = Object.assign({}, json);
    for (let key in json) {
      let value = json[key];
      if (typeof value === "object" && !Array.isArray(value)) {
        shadowCopy[key] = wrapOperators(shadowCopy[key]);
      }
      if (operators.indexOf(key) > -1) {
        const ownValue = shadowCopy[key];
        delete shadowCopy[key];
        shadowCopy["$" + key] = ownValue;
      }
      if (key.indexOf(nestedDocs) > -1) {
        const ownValue = shadowCopy[key];
        delete shadowCopy[key];
        shadowCopy[key.replace(nestedDocs, ".")] = ownValue;
      }
    }
    return shadowCopy;
  } else return json;
};

export const normalizeTagsWithLevels = tags => {
  return tags.map(item => {
    const tag = Tags.service.getTag(item.tag);
    return {
      tag: { ...tag },
      level: item.level || "",
      levelColor: item.levelColor || "",
      icon: item.icon || ""
    };
  });
};

export default AuxFunctions;
