import StorageS3 from '../aws/StorageS3';

/**
 * @class UtilsService
 * @summary Utils Service with business logic
 */
class UtilsService {
  /**
   * @name resourceUpload
   * @summary function for save and update
   * @param {String} body - the content to be upload to S3
   * @param {String} contentType - the content type of the file
   * @param {String} path - the path of the file in to S3
   * @return {String} path - return the path of the file in S3
   */
  static resourceUpload = async (body, contentType, path) => {
    var buffer = new Buffer(body, 'binary');

    console.log('saving image');
    console.log('Content-Length', body.length);
    console.log('Content-Type', contentType);

    try {

      const error = await StorageS3.putObject({
        Body: buffer,
        Key: path,
        ContentLength: body.length,
        ContentType: contentType
      });

      //if (error)
      //todo: handle Error

      return path;
    } catch (exception) {
      //todo: handle Error
    }
  };
}

export default UtilsService;
