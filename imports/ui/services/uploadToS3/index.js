import { Meteor } from "meteor/meteor";
import Axios from "axios";

let CanvasCompress = null;
if (Meteor.isClient) CanvasCompress = require("canvas-compress");

class UploadToS3 {
  constructor() {
    this.bucketPath = "https://s3.amazonaws.com/mlsociety-public";
  }

  uploadImage(image, callback, statusCallback) {
    if (image.size / 1024 / 1024 > 4) {
      callback({
        error: true,
        message: "The image selected must be < (4 Mb)"
      });
      return;
    }
    if (image.type.indexOf("image") !== 0) {
      callback({
        error: true,
        message: "The file selected must be an image"
      });
      return;
    }
    statusCallback && statusCallback({ uploading: true });
    try {
      const url = "/upload";
      const formData = new FormData();
      formData.append("file", image);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      if (!Meteor.isDevelopment) {
        Axios.post(url, formData, config).then(response => {
          const data = response.data;
          statusCallback && statusCallback({ uploading: false });
          callback({
            error: data.error,
            result: data.path
          });
        });
      } else {
        // to avoid upload the image and save the base64
        this.handleOnDevelopmentMode(image, callback, statusCallback);
      }
    } catch (e) {
      statusCallback && statusCallback({ uploading: false });
      callback({
        error: e,
        message: e.description
      });
    }
  }

  uploadFile(file, callback, statusCallback) {
    statusCallback && statusCallback({ uploading: true });
    try {
      const url = "/upload-file";
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      Axios.post(url, formData, config).then(response => {
        const data = response.data;
        statusCallback && statusCallback({ uploading: false });
        callback({
          error: data.error,
          result: data.path
        });
      });
    } catch (e) {
      statusCallback && statusCallback({ uploading: false });
      callback({
        error: e,
        message: e.description
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
        statusCallback && statusCallback({ uploading: false });
      },
      false
    );
    readerData.readAsDataURL(image);
  }
}

export default new UploadToS3();
