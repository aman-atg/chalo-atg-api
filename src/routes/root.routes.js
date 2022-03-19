const router = require("express").Router();
const { status, getHome } = require("../controllers/root.controllers");

router.get("/", status);
router.get("/home", getHome);

module.exports = router;
