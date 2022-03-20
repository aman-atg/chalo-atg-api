const router = require("express").Router();
const {
  createRoute,
  getRoute,
  removeRoute,
  editRoute,
  getRoutes,
} = require("../controllers/route.controllers");
const { requireAuth, optionalAuth } = require("../middlewares");

router.get("/", optionalAuth, getRoutes);
router.post("/", requireAuth, createRoute);
router.put("/", requireAuth, editRoute);
router.delete("/:routeId", requireAuth, removeRoute);
router.get("/:routeId", optionalAuth, getRoute);

module.exports = router;
