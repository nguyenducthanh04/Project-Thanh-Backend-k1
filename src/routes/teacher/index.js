var express = require("express");
var router = express.Router();
const TeacherController = require("../../http/controllers/teacher/teacher.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
/* GET home page. */
router.get("/", AuthMiddleware, TeacherController.index);
router.get("/classes", AuthMiddleware, TeacherController.ClassTeacher);
router.get(
  "/classDetail/:id",
  AuthMiddleware,
  TeacherController.classTeacherDetail
);
router.get(
  "/class/excersise/:id",
  AuthMiddleware,
  TeacherController.classExcersise
);
router.get(
  "/class/createExcersise/:id",
  AuthMiddleware,
  TeacherController.createExcersise
);
router.post(
  "/class/createExcersise/:id",
  TeacherController.handleCreateExcersise
);
router.get(
  "/class/excersiseDetail/:id",
  AuthMiddleware,
  TeacherController.excersiseClassDetail
);
router.post(
  "/class/excersiseDetail/:id",
  TeacherController.handleCommentExcersise
);
router.get("/courses", AuthMiddleware, TeacherController.coursesList);
router.get(
  "/coursesDetail/:id",
  AuthMiddleware,
  TeacherController.courseDetail
);
router.get("/addDocument/:id", AuthMiddleware, TeacherController.addDocuments);
router.post("/addDocument/:id", TeacherController.handleAddDocuments);
router.get(
  "/addMoreDocument/:id",
  AuthMiddleware,
  TeacherController.addMoreDocument
);
router.post("/addMoreDocument/:id", TeacherController.handleAddMoreDocument);
router.get(
  "/listStudentClass/:id",
  AuthMiddleware,
  TeacherController.listStudentClass
);
router.get(
  "/editModuleDocument/:id",
  AuthMiddleware,
  TeacherController.editModuleDocument
);
router.post(
  "/editModuleDocument/:id",
  TeacherController.handleEditModuleDocument
);
router.get(
  "/studentDetail/:id",
  AuthMiddleware,
  TeacherController.studentClassDetail
);
router.get(
  "/class/attendance/:id",
  AuthMiddleware,
  TeacherController.attendance
);
router.post("/class/attendance/:id", TeacherController.handleAttendance);
router.get("/student/updateStatus/:id", TeacherController.updateStatusStudent);
router.post(
  "/student/updateStatus/:id",
  TeacherController.handleUpdateStatusStudent
);

module.exports = router;
