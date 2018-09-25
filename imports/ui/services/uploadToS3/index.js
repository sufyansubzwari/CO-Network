import { Meteor } from "meteor/meteor";
import { saveResource } from "../../controller/resources/ResourceController";
import v1 from "uuid/v1";
let CanvasCompress = null;
if (Meteor.isClient) CanvasCompress = require("canvas-compress");

class UploadImageToS3 {
  constructor() {
    this.bucketPath = "https://s3.amazonaws.com/mlsociety-public";
  }

  upload(image, callback, statusCallback) {
    if (image.size / 1024 / 1024 > 4) {
      callback({
        error: true,
        message: "The image selected must be < (4 Mb)",
        type: "warning"
      });
      return;
    }
    if (image.type.indexOf("image") !== 0) {
      callback({
        error: true,
        message: "The file selected must be an image",
        type: "danger"
      });
      return;
    }
    statusCallback({ uploading: true });
    try {
      let reader = new FileReader();
      let readerCompressed = new FileReader();
      let extension = image.name.split(".").pop();
      let fileName = `${v1()}.${extension}`;
      let path = `resources/${fileName}`;
      let pathCompressed = `resources/compressed/${fileName}`;
      let compressor;
      if (CanvasCompress) {
        compressor = new CanvasCompress({
          type: CanvasCompress.MIME.JPEG,
          width: 1000,
          height: 618,
          quality: 0.9
        });
        compressor.process(image).then(({ source, result }) => {
          const { blob, width, height } = result;
          if (!Meteor.isDevelopment) {
            // regular reader
            reader.addEventListener(
              "load",
              () => {
                let src = reader.result;
                saveResource(src, image.type, path, (error, result) => {
                  if (!error) {
                    callback({
                      error: error,
                      result: result,
                      imagePath: `${this.bucketPath}/${path}`,
                      type: "success"
                    });
                    statusCallback({ uploading: false });
                  } else {
                    callback({
                      error: error,
                      message: error.description,
                      type: "success"
                    });
                  }
                });
              },
              false
            );
            // compress reader
            readerCompressed.addEventListener(
              "load",
              () => {
                let src = readerCompressed.result;
                saveResource(
                  src,
                  image.type,
                  pathCompressed,
                  (error, result) => {
                    if (!error) {
                      callback({
                        error: error,
                        result: result,
                        imagePath: `${this.bucketPath}/${pathCompressed}`,
                        type: "success"
                      });
                      statusCallback({ uploading: false });
                    } else {
                      callback({
                        error: error,
                        message: error.description,
                        type: "success"
                      });
                    }
                  }
                );
              },
              false
            );
            readerCompressed.readAsDataURL(blob);
            reader.readAsBinaryString(image);
          } else {
            // to avoid upload the image and save the base64
            this.handleOnDevelopmentMode(image, callback, statusCallback);
          }
        });
      }
    } catch (e) {
      callback({
        error: e,
        message: e.description,
        type: "danger"
      });
    }
  }

  handleOnDevelopmentMode(image, callback, statusCallback) {
    let readerData = new FileReader();
    readerData.addEventListener(
      "load",
      function() {
        let src = readerData.result;
        callback({
          error: false,
          result: src,
          imagePath: src,
          type: "success"
        });
        statusCallback({ uploading: false });
      },
      false
    );
    readerData.readAsDataURL(image);
  }
}

export default new UploadImageToS3();
