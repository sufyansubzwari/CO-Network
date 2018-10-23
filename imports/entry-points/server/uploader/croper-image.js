const Jimp = require("jimp");

class CropperImage {
  constructor() {}

  async copperImage(file, options) {
    return await this._reduceImage(file, options);
  }

  _reduceImage(file, options) {
    return new Promise(resolve => {
      try {
        Jimp.read(file)
          .then(fileCropped => {
            fileCropped
              .resize(options.width, options.height)
              .quality(90)
              .getBufferAsync(Jimp.MIME_PNG)
              .then(resolve);
          })
          .catch(err => {
            resolve(false);
          });
      } catch (e) {
        resolve({
          error: e
        });
      }
    });
  }
}

export default new CropperImage();
