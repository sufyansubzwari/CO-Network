/* eslint-disable consistent-return */

import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import StorageS3 from '../aws/StorageS3';
import handleMethodException from './handle-method-exception';
import rateLimit from './rate-limit';

const uuidv1 = require('uuid/v1');

Meteor.methods({
  'resource.upload': async function eventsFindOne(body, contentType, path) {
      console.log("resource.upload called!!!")
    check(body, String);
    check(contentType, String);
    check(path, Match.Maybe(String));
    // let buf = new Buffer(body.replace(/^data:image\/\w+;base64,/, ""),'base64');
    // path = path || `resources/${uuidv1()}.${ext}`;
    var buffer = new Buffer(body, 'binary');

    console.log('saving image');
    console.log('Content-Length', body.length);
    console.log('Content-Type', contentType);

    try {

      const error = await StorageS3.putObject(
        {
          Body: buffer,
          Key: path,
          ContentLength: body.length,
          ContentType: contentType
        });
      if (error)
        handleMethodException("Error uploading file to s3");
      return path;
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: [
    'resource.upload'
  ],
  limit: 5,
  timeRange: 1000,
});
