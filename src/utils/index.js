const parser = require("datauri/parser");
const path = require("path");
const dataUri = new parser();
const config = require("../config/");
const cloudinary = require("cloudinary").v2;
cloudinary.config(config.cloudinary);

// TODO:
// 1. Avatar img transformation while uploading it to server
// 2. Video transformation, gerating thumbnails and e_preview
// util func to get video from buffer + cloudinary upload if possible then secure_url

const uploadToCloud = async (media, id) => {
  // if(fieldname==="avatar")do this...
  let result;
  const file = dataUri.format(
    path.extname(media.originalname).toString(),
    media.buffer
  ).content;

  if (media.fieldname === "avatar")
    result = await cloudinary.uploader.upload(file, {
      public_id: `Avatar/${id}`,
      upload_preset: "testCloud",
    });
  else {
    result = await cloudinary.uploader.upload(file, {
      resource_type: "video",
      folder: `testCloud/${media.fieldname}`,
    });
  }

  return result.secure_url;
};

module.exports = { uploadToCloud };
