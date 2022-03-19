const Route = require("../models/route.model");
const ash = require("express-async-handler");

const status = (req, res, next) => res.status(200).json({ server: "running" });

const getHome = ash(async (req, res, next) => {
  const routes = await Route.find();
  res.status(200).json({ success: true, data: { routes } });
});

// const searchPosts = ash(async (req, res, next) => {
// get search term and fetch routes
// });

module.exports = { status, getHome };
