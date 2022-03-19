const router = require("express").Router();
const {
  createStop,
  getStop,
  removeStop,
  editStop,
} = require("../controllers/stop.controllers");
const { requireAuth, optionalAuth } = require("../middlewares");

router.post("/", requireAuth, createStop);
router.put("/", requireAuth, editStop);
router.post("/delete", requireAuth, removeStop);
router.get("/:stopId", optionalAuth, getStop);

module.exports = router;
