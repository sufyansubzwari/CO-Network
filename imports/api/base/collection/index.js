import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import baseSchema from "./baseSchema";
/**
 * @class BaseCollection
 * @summary Base class for Mongodb collection.
 */
class BaseCollection extends Mongo.Collection {
  /**
   * Constructor for a BaseCollection
   *
   * @param {String} name - <p>The name of the collection.  If null, creates an unmanaged (unsynchronized) local collection.</p>
   * @param {Options} [options]
   */
  constructor(name, options) {
    super(name, options);
  }
  /**
   *@summary Override attachSchema
   * @override
   * @param {Object} schema - <p>Schema definition.</p>
   */
  attachSchema(schema) {
    schema.extend(baseSchema);
    this.attachSchema(schema);
  }
  /**
   * @summary Mongodb Collection Aggregation
   * @param {Object} pipeline - <p>Pipeline array</p>
   * @param {Object} options - <p>Aggregation option</p>
   * @return {Object} AggregationCursor
   */
  aggregate(pipeline, options) {
    return this.rawCollection().aggregate(pipeline, options);
  }
  /**
   * @summary Mongodb Collection  count
   * @param {Object} query - <p>The query for the count.</p>
   * @param {Object} options - <p>Optional settings.</p>
   * @param {Function} callback - <p>Optional settings.</p>
   * @return {Promise}
   */
  count(query, options, callback) {
    return this.rawCollection().count(query, options, callback);
  }
  /**
   * @summary Mongodb Collection  distinct
   * @param {Object} key - <p>Field of the document to find distinct values for.</p>
   * @param {Object} query - <p>The query for the count.</p>
   * @param {Object} options - <p>Optional settings.</p>
   * @param {Function} callback - <p>Optional settings.</p>
   * @return {Promise}
   */
  distinct(key,query, options, callback) {
    return this.rawCollection().distinct(key,query, options, callback);
  }
}

export default BaseCollection