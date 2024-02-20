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
router.get("/class/excersise/:id", TeacherController.classExcersise);
router.get("/class/createExcersise/:id", TeacherController.createExcersise);
router.post(
  "/class/createExcersise/:id",
  TeacherController.handleCreateExcersise
);
router.get(
  "/class/excersiseDetail/:id",
  TeacherController.excersiseClassDetail
);
router.post(
  "/class/excersiseDetail/:id",
  TeacherController.handleCommentExcersise
);
router.get("/courses", TeacherController.coursesList);
router.get("/coursesDetail/:id", TeacherController.courseDetail);
router.get("/addDocument/:id", TeacherController.addDocuments);
router.post("/addDocument/:id", TeacherController.handleAddDocuments);
router.get("/addMoreDocument/:id", TeacherController.addMoreDocument);
router.post("/addMoreDocument/:id", TeacherController.handleAddMoreDocument);
router.get("/listStudentClass/:id", TeacherController.listStudentClass);
router.get("/editModuleDocument/:id", TeacherController.editModuleDocument);
router.post(
  "/editModuleDocument/:id",
  TeacherController.handleEditModuleDocument
);

module.exports = router;
