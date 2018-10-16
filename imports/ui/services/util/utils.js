const formatSize = size => {
  let sizeMb = "0 bytes";
  if (size) {
    sizeMb = size / (1024 * 1024);
    if (sizeMb > 1.0) return sizeMb.toFixed(1) + " MB";
    else {
      let sizeKb = sizeMb * 1024;
      if (sizeKb > 1.0) return sizeKb.toFixed(1) + " KB";
      else return sizeKb * 1024 + " bytes";
    }
  }
  return sizeMb;
};

export default {formatSize};
