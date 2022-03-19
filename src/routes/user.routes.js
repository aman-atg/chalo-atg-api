const router = require("express").Router();
const { changeAvatar, me } = require("../controllers/user.controllers");
const { requireAuth, multerUpload } = require("../middlewares");

router.get("/me", requireAuth, me);

router.post("/change_avatar", [requireAuth, multerUpload], changeAvatar);

module.exports = router;
