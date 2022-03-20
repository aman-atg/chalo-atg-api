const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.verify(token, process.env.SECRET).id;

    //Only pass Id to other route controllers , they can fetch whatever they want..
    if (!id) {
      return next({ message: "Not Authorized", statusCode: 401 });
    }
    req._id = id;

    next();
  } catch (error) {
    return next({ message: "Not Authorized", statusCode: 401 });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.verify(token, process.env.SECRET).id;
    if (!id) return next({ message: "Not Authorized", statusCode: 401 });
    req._id = id;
    next();
  } catch (error) {
    // bypassing error if there is any
    return next();
  }
};

module.exports = { requireAuth, optionalAuth };
