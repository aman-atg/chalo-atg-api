const ash = require("express-async-handler");
const Route = require("../models/route.model");
const Stop = require("../models/stop.model");

const createRoute = ash(async (req, res, next) => {
  req.body.author = req._id;
  const stops = [];

  const route = await new Route({ name: req.body.routeName, author: req._id });

  Object.keys(req.body).forEach((key) => {
    if (key.includes("stop")) {
      const { name, lat, lng } = req.body[key];
      if (name && lat && lng) {
        let stop = new Stop({
          name,
          latitude: lat,
          longitude: lng,
        });
        stops.push(stop);
        route.stops.push(stop._id);
      }
    }
  });

  stops.forEach(async (stop) => {
    await stop.save();
  });

  route.save();
  res.status(200).json({ success: true, data: { route } });
});

const getRoutes = ash(async (req, res, next) => {
  const routes = await Route.find({}).populate("stops").populate({
    path: "author",
    select: "name email avatar",
  });
  res.status(200).json({ success: true, data: { routes } });
});

const getRoute = ash(async (req, res, next) => {
  const { routeId } = req.params;
  const route = await Route.findById(routeId).populate("stops");

  if (!route) {
    return next({ statusCode: 400, message: "Route not found!" });
  }

  res.status(200).json({ success: true, data: { route } });
});

const editRoute = ash(async (req, res, next) => {
  const stops = [];
  const { _id, routeName, status, direction } = req.body;
  // todo: check if route exists
  const route = await Route.findById(_id);
  if (!route) {
    return next({ statusCode: 400, message: "Route not found!" });
  }
  // todo: not the best way to do this (worst)
  route.stops = [];
  route.name = routeName;
  route.status = status;
  route.direction = direction;

  Object.keys(req.body).forEach((key) => {
    if (key.includes("stop")) {
      const { name, lat, lng } = req.body[key];
      if (name && lat && lng) {
        let stop = new Stop({
          name,
          latitude: lat,
          longitude: lng,
        });
        stops.push(stop);
        route.stops.push(stop._id);
      }
    }
  });

  stops.forEach(async (stop) => {
    await stop.save();
  });

  route.save();
  res.status(200).json({ success: true, data: { route } });
});

const removeRoute = ash(async (req, res, next) => {
  const { routeId } = req.params;
  const removeRoute = await Route.deleteOne({ _id: routeId });

  if (!removeRoute) {
    return next({ statusCode: 400, message: "Route not found!" });
  }

  res.status(200).json({ success: !!removeRoute.n, data: { removeRoute } });
});

module.exports = { createRoute, editRoute, getRoute, getRoutes, removeRoute };
