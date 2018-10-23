import express from "express";
import { WebApp } from "meteor/webapp"; // Meteor-specific
import v1 from "uuid/v1";
const fileUpload = require("express-fileupload");
import StorageS3 from "../../../api/utils/aws/StorageS3";
import CropperImage from "./croper-image";

export function setupApi() {
  const app = express();

  app.use(
    fileUpload({
      limits: { fileSize: 1024 * 1024 * 1024 }
    })
  );

  const resolutions = {
    card: {
      width: 300,
      height: 250
    },
    cover: {
      width: 1000,
      height: 300
    },
    chat: {
      width: 400,
      height: 300
    },
    photo: {
      width: 150,
      height: 150
    },
    compressed: {
      width: 1000,
      height: 618
    }
  };

  const uploadFile = (file, name) => {
    const configurations = {
      Body: file.data,
      Key: `resources/${name}`,
      ContentType: file.mimetype
    };
    return StorageS3.putObject(configurations);
  };

  const uploadFileCropped = (file, croppedfile, name, prefix) => {
    const configurations = {
      Body: croppedfile,
      Key: `resources/${prefix}/${name}`,
      ContentType: file.mimetype
    };
    return StorageS3.putObject(configurations);
  };

  app.post("/upload", (req, res) => {
    if (Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const requests = [];
    let file = req.files.file;
    const name = file.name.replace(/ /g, "-");
    let extension = name.split(".").pop();
    const fileName = `${v1()}.${extension}`;

    // uploading the original picture
    requests.push(uploadFile(file, fileName));

    // uploading the different picture resolutions
    Object.keys(resolutions).forEach(async key => {
      const config = resolutions[key];
      const newFile = await CropperImage.copperImage(file.data, config);
      if (newFile) {
        requests.push(uploadFileCropped(file, newFile, fileName, key));
      } else console.log("Error", `Uploading the ${key} image for ${fileName}`);
    });

    Promise.all(requests).then(error => {
      const existErrors = error.some(e => e);
      if (existErrors)
        return res.status(500).send({
          error: true
        });
      res.send({
        error: false,
        path: fileName
      });
    });
  });

  WebApp.connectHandlers.use(app);
}
setupApi();
