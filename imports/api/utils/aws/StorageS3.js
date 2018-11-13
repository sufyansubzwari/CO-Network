const S3 = require("aws-sdk/clients/s3");
import { Meteor } from "meteor/meteor";

/**
 * Implementation of Storage for S3 buckets
 */
class StorageS3 {
  static instance;

  constructor() {
    let bucket;
    let region;
    let awsKey;
    let awsSecret;
    try {
      awsKey = Meteor.settings.private.aws.AWS_ACCESS_KEY_ID;
      awsSecret = Meteor.settings.private.aws.AWS_SECRET_ACCESS_KEY;
      bucket = Meteor.settings.s3.bucket;
      region = Meteor.settings.s3.region;
    } catch (e) {}
    process.env.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || awsKey;
    process.env.AWS_SECRET_ACCESS_KEY =
      process.env.AWS_SECRET_ACCESS_KEY || awsSecret;
    this.bucket =
      process.env.BUCKET ||
      process.env.AWS_S3_BUCKET ||
      bucket ||
      "conetwork-ai";
    this.s3 = new S3({
      region:
        process.env.AWS_REGION || process.env.REGION || region || "us-east-1"
    });
  }

  /**
   * Process File and upload to S3 bucket
   * @param {string} params content of the file to process.
   */
  putObject(params) {
    if (!params.Bucket) params.Bucket = this.bucket;
    return new Promise(resolve => {
      this.s3.putObject(params, error => {
        if (error) {
          console.error(error);
          console.error("error uploading file to s3");
          resolve(true);
        } else {
          console.log("success uploading to s3");
          resolve();
        }
      });
    });
  }

  static getInstance() {
    if (!this.instance) this.instance = new StorageS3();
    return this.instance;
  }
}

export default StorageS3.getInstance();
