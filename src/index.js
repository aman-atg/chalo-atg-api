require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./errorHandler");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Routes
app.use("/v1/", require("./routes/root.routes"));
app.use("/v1/auth", require("./routes/auth.routes"));
app.use("/v1/user", require("./routes/user.routes"));
app.use("/v1/route", require("./routes/route.routes"));

// add errorhandler middleware
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${process.env.PORT}`);
});
