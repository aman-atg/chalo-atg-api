const ash = require("express-async-handler");
const Route = require("../models/route.model");

const createRoute = ash(async (req, res, next) => {
  req.body.author = req._id;
  const route = await new Route(req.body);
  route.save();
  res.status(200).json({ success: true, data: { route } });
});

const getRoute = ash(async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findByIdAndUpdate(routeId);

  if (!route) {
    return next({ statusCode: 400, message: "Route not found!" });
  }

  res.status(200).json({ success: true, data: { post } });
});

const editRoute = ash(async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findByIdAndUpdate(routeId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!route) {
    return next({ statusCode: 400, message: "Route not found!" });
  }

  res.status(200).json({ success: true, data: { route } });
});

const removeRoute = ash(async (req, res, next) => {
  const { routeId } = req.body;

  const removeRoute = await Route.deleteOne({ _id: routeId });

  res.status(200).json({ success: !!removeRoute.n, data: { removeRoute } });
});

module.exports = { createRoute, editRoute, getRoute, removeRoute };
