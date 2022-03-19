const ash = require("express-async-handler");
const User = require("../models/user.model");

const changeAvatar = ash(async (req, res, next) => {
  const { _id } = req;
  const avatar = req.files.avatar[0];
  const avatarUrl = await uploadToCloud(avatar, _id);

  const avatarUpdate = await User.updateOne({ _id }, { avatar: avatarUrl });
  if (!avatarUpdate.nModified)
    return next({
      message: "Could not update avatar!",
      statusCode: 500,
    });

  return res.status(200).json({ success: true, data: { avatar: avatarUrl } });
});

// personal info about current user
const me = ash(async (req, res, next) => {
  const user = await User.findOne(
    { _id: req._id },
    "-password -__v -createdAt"
  );

  if (!user) return next({ message: "No Data Found!", statusCode: 401 }); //or user not found..

  res.status(200).json({ success: true, data: { user } });
});

module.exports = { changeAvatar, me };
