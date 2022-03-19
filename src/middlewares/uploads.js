const multer = require("multer");
const storage = multer.memoryStorage();
const multerUpload = multer({ storage, limits: 1e8 }).fields([
  { name: "avatar", maxCount: 1 },
  { name: "images", maxCount: 5 },
  { name: "video", maxCount: 1 },
]);

module.exports = { multerUpload };
