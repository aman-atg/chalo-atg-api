const ash = require("express-async-handler");
const Stop = require("../models/stop.model");

const createStop = ash(async (req, res, next) => {
  req.body.author = req._id;
  const stop = await new Stop(req.body);
  stop.save();
  res.status(200).json({ success: true, data: { stop } });
});

const getStop = ash(async (req, res, next) => {
  const { stopId } = req.params;
  const stop = await Stop.findByIdAndUpdate(stopId);

  if (!stop) {
    return next({ statusCode: 400, message: "Stop not found!" });
  }

  res.status(200).json({ success: true, data: { post } });
});

const editStop = ash(async (req, res, next) => {
  const { stopId } = req.params;
  const stop = await Stop.findByIdAndUpdate(stopId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!stop) {
    return next({ statusCode: 400, message: "Stop not found!" });
  }

  res.status(200).json({ success: true, data: { stop } });
});

const removeStop = ash(async (req, res, next) => {
  const { stopId } = req.body;
  const removeStop = await Stop.deleteOne({ _id: stopId });
  res.status(200).json({ success: !!removeStop.n, data: { removeStop } });
});

module.exports = { createStop, editStop, getStop, removeStop };
