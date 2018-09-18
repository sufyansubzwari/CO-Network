import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

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

const operators = ["and", "or", "ne", "lte", "gte", "gt", "gt", "contains", "notContains", "between", "beginsWith", "regex", "elemMatch"];
const nestedDocs = "_DOT_";

export const wrapOperators = (json) => {
  let shadowCopy = Object.assign({}, json);
  for (let key in json) {
    let value = json[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      shadowCopy[key] = wrapOperators(shadowCopy[key]);
    }
    if (operators.indexOf(key) > -1) {
      const ownValue = shadowCopy[key];
      delete shadowCopy[key];
      shadowCopy[("$" + key)] = ownValue;
    }
    if (key.indexOf(nestedDocs) > -1) {
      const ownValue = shadowCopy[key];
      delete shadowCopy[key];
      shadowCopy[(key.replace(nestedDocs, "."))] = ownValue;
    }
  }
  console.log("wrapOperators", JSON.stringify(shadowCopy));
  return shadowCopy;
};

export default AuxFunctions;
