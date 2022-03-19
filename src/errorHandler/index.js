const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

  // new key-value
  // errorType : AuthError
  res.status(statusCode).json({ success: "false", message });
};

module.exports = errorHandler;
