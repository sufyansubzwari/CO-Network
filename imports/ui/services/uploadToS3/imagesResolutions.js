import { Meteor } from "meteor/meteor";
import { saveResource } from "../../controller/resources/ResourceController";
import v1 from "uuid/v1";
let CanvasCompress = null;
if (Meteor.isClient) CanvasCompress = require("canvas-compress");

class UploadResolutions {

    constructor(){

        this.bucketPath = "https://s3.amazonaws.com/mlsociety-public";
        this.resolutions = {
            card: {
                width: 300,
                height: 250,
                prefix: 'card'
            },
            cover: {
                width: 1000,
                height: 300,
                prefix: 'cover'
            },
            chat: {
                width: 400,
                height: 300,
                prefix: 'chat'
            },
            photo: {
                width: 150,
                height: 150,
                prefix: 'photo'
            },
            compressed: {
                width: 1000,
                height: 618,
                prefix: 'compressed'
            }
        };

        this.options = {
            card: true,
            cover: true,
            chat: true,
            photo: true,
            compressed: true
        }
    }

    uploadImgResolutions(image,callback,uid ,options){
       let opt = options;
        if(!opt){
           opt = this.options
       }

       let res = {}
       let extension = image.name.split(".").pop();
       let fileName = uid;

       for( let property in opt ){
            if(opt[property]){

                let readerCompressed = new FileReader();
                let path = `resources/${this.resolutions[property].prefix}/${fileName}`;
                let compressor;
                if (CanvasCompress) {
                    compressor = new CanvasCompress({
                        type: CanvasCompress.MIME.JPEG,
                        width: this.resolutions[property].width,
                        height: this.resolutions[property].height,
                        quality: 0.9
                    });
                    compressor.process(image).then(({ source, result }) => {
                        const { blob, width, height } = result;
                        if (!Meteor.isDevelopment) {
                            // compress reader
                            readerCompressed.addEventListener(
                                "load",
                                () => {
                                    let src = readerCompressed.result;
                                    saveResource(
                                        src,
                                        image.type,
                                        path,
                                        (error, result) => {
                                            if (!error) {
                                                res[property] = `${fileName}`;
                                                if(Object.keys(opt)[Object.keys(opt).length-1] === property)
                                                    callback({...res});
                                            } else {
                                                console.log("error uploading image in resolution "+property)
                                            }
                                        }
                                    );
                                },
                                false
                            );
                            readerCompressed.readAsBinaryString(blob);
                        } else {
                            // to avoid upload the image and save the base64
                        }
                    });
                }

            }
       }
    }

}

export default new UploadResolutions()