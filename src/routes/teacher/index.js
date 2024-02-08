var express = require("express");
var router = express.Router();
const TeacherController = require("../../http/controllers/teacher/teacher.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
/* GET home page. */
router.get("/", AuthMiddleware, TeacherController.index);
router.get("/class", AuthMiddleware, TeacherController.ClassTeacher);

module.exports = router;
