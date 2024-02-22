var express = require("express");
var router = express.Router();
const StudentController = require("../../http/controllers/students/student.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");

/* GET home page. */
router.get("/", AuthMiddleware, StudentController.index);
router.get("/changePass", StudentController.changePass);
router.get("/classes", StudentController.ClassStudent);
router.get("/classDetail/:id", StudentController.classStudentDetail);
router.get("/attendance/:id", StudentController.attendance);
module.exports = router;
