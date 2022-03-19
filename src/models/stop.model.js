const mongoose = require("mongoose");

// Definition of a Stop :
// ● Stop Id
// ● Stop Name
// ● Latitude
// ● Longitude

const StopSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 225,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Stop = mongoose.model("Stop", StopSchema);
module.exports = Stop;
