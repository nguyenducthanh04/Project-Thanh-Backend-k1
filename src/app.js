require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var expressLayouts = require("express-ejs-layouts");
var flash = require("connect-flash");
const studentRouter = require("./routes/students/index");
const teacherRouter = require("./routes/teacher/index");
const adminRouter = require("./routes/admin/index");
var app = express();
app.use(
  session({
    secret: "f8",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(expressLayouts);
app.use(flash());
// view engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
//Router
app.use("/", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
