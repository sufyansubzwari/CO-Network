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

const getImageFromS3 = (id,prefix) => {
  let bucketPath = "https://s3.amazonaws.com/mlsociety-public";
  return prefix && prefix !== "" && prefix !== "base" ? `${bucketPath}/resources/${prefix}/${id}` :  `${bucketPath}/resources/${id}`;

};

const getNumberFromPose = number => {
  if (!number) return 0;
  const type = typeof x;
  if (type === "string") return Number(number.replace("%", ""));
  return number;
};

export default { formatSize, getNumberFromPose, getImageFromS3 };
