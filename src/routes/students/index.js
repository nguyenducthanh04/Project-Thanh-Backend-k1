var express = require("express");
var router = express.Router();
const StudentController = require("../../http/controllers/students/student.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");

/* GET home page. */
router.get("/", AuthMiddleware, StudentController.index);
router.get("/changePass", AuthMiddleware, StudentController.changePass);
router.get("/classes", AuthMiddleware, StudentController.ClassStudent);
router.get(
  "/classDetail/:id",
  AuthMiddleware,
  StudentController.classStudentDetail
);
router.get(
  "/class/attendance/:id",
  AuthMiddleware,
  StudentController.attendance
);
router.get("/courses", AuthMiddleware, StudentController.studentCourses);
router.get(
  "/coursesDetail/:id",
  AuthMiddleware,
  StudentController.courseDetail
);
router.get(
  "/class/excersise/:id",
  AuthMiddleware,
  StudentController.classExcersise
);
router.get(
  "/class/excersiseDetail/:id",
  AuthMiddleware,
  StudentController.excersiseClassDetail
);
router.post(
  "/class/excersiseDetail/:id",
  StudentController.handleCommentExcersise
);

module.exports = router;
