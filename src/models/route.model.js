const mongoose = require("mongoose");
const User = require("./user.model");

// Definition of a Route :
// ● Name (Eg. - 107)
// ● Direction - UP/DOWN
// ● Route Id
// ● Status - Active/Inactive
// ● List of Stops in sequence

const RouteSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 225,
    required: true,
  },
  direction: {
    type: String,
    enum: ["UP", "DOWN"],
    required: true,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
  stops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop",
    },
  ],
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RouteSchema.pre("save", async function (next) {
  console.log("saving post");
  const { _id, author } = this;
  if (!_id) {
    return next({ statusCode: 400, message: "Error in saving your post." });
  }
  User.findByIdAndUpdate(author, {
    $addToSet: { routes: _id },
  });
});

// cleanup
RouteSchema.pre("deleteOne", async function (next) {
  console.log(this);
  const _id = this.getFilter()["_id"];
  if (!_id) {
    return next({ statusCode: 400, message: "cleanup error" });
  }

  const { author } = await Route.findById(_id);

  await User.updateOne({ _id: author }, { $pull: { routes: _id } });

  next();
});

const Route = mongoose.model("Route", RouteSchema);
module.exports = Route;
