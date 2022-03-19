const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 75,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  routes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Route" }],
  password: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/cloud-atg/image/upload/v1596495204/testCloud/Avatar/default-avatar_ipmk6k.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: "15 days",
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
