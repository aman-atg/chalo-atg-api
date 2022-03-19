const router = require("express").Router();
const {
  createRoute,
  getRoute,
  removeRoute,
  editRoute,
} = require("../controllers/route.controllers");
const { requireAuth, optionalAuth } = require("../middlewares");

router.post("/", requireAuth, createRoute);
router.put("/", requireAuth, editRoute);
router.post("/delete", requireAuth, removeRoute);
router.get("/:postId", optionalAuth, getRoute);

module.exports = router;
