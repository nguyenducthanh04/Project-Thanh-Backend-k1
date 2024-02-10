var express = require("express");
var router = express.Router();
const model = require("../../models/index");
const Courses = model.courses;
const User = model.User;
const Classes = model.classes;
const multer = require("multer");
const ExcelJS = require("exceljs");
const path = require("path");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const UserController = require("../../http/controllers/admin/user.controller");
const CourseController = require("../../http/controllers/admin/course.controller");
const ClassController = require("../../http/controllers/admin/class.controller");
//setup lại

/*Controller*/
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
const UserValidateMiddleware = require("../../http/middlewares/user.validate.middleware");
const CourseValidateMiddleware = require("../../http/middlewares/course.validate.middleware");
const ClassesValidateMiddleware = require("../../http/middlewares/classes.validate.middleware");
const EditClassesValidateMiddleware = require("../../http/middlewares/editclass.validate.middleware");
const AdminController = require("../../http/controllers/admin/dashboard.controller");
/* GET home page. */
router.get("/", AuthMiddleware, DashboardController.index);
router.get("/deleteSocialGoogle", DashboardController.deleteSocialGoogle);
router.get("/deleteSocialGithub", DashboardController.deleteSocialGithub);
router.get("/changeProfile", AuthMiddleware, DashboardController.changeProfile);
router.post(
  "/changeProfile",
  AuthMiddleware,
  DashboardController.handleChangeProfile
);
router.get("/settings", AuthMiddleware, DashboardController.settingAdmin);
router.get("/changePass", AuthMiddleware, DashboardController.changePassword);
router.post("/changePass", DashboardController.handleChangePass);
router.get("/userList", AuthMiddleware, UserController.userList);
router.get("/teacherList", AuthMiddleware, UserController.teacherList);
router.get("/studentList", AuthMiddleware, UserController.studentList);
router.get("/createUser", AuthMiddleware, UserController.createUser);
router.post(
  "/createUser",
  UserValidateMiddleware(),
  UserController.handleCreateUser
);
router.get("/editUser/:id", AuthMiddleware, UserController.editUser);
router.post("/editUser/:id", UserController.handleEditUser);
router.post("/deleteUser/:id", UserController.deleteUser);
router.get("/courseList", AuthMiddleware, CourseController.courseList);
router.get("/editCourse/:id", AuthMiddleware, CourseController.editCourse);
router.post("/editCourse/:id", CourseController.handleEditCourse);
router.post("/deleteCourse/:id", CourseController.deleteCourse);
router.get("/createCourse", AuthMiddleware, CourseController.createCourse);
router.post(
  "/createCourse",
  CourseValidateMiddleware(),
  CourseController.handleCreateCourse
);
router.get("/exportStudent", UserController.exportStudent);
router.get("/exportAdmin", UserController.exportAdmin);
router.get("/exportTeacher", UserController.exportTeacher);
router.get("/exportCourse", CourseController.exportCourse);
router.post("/deleteAllCourse", CourseController.deleteAllCourses);
router.post("/deleteAllStudents", UserController.deleteAllStudents);

//Import Excel Course
router.get(
  "/importExcelCourse",
  AuthMiddleware,
  CourseController.importExcelCourse
);

router.post(
  "/importExcelCourse",
  upload.single("excelFile"),
  async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      const data = row.values;
      console.log("DataExcel:", data);
      console.log("du lieu data excel", parseInt(data[3]));
      if (rowNumber !== 1) {
        await Courses.create({
          name: data[2],
          price: parseInt(data[3]),
          teacherId: parseInt(data[4]),
          // tryLearn: data[5],
          quantity: parseInt(data[5]),
          duration: parseInt(data[6]),
        });
      }
    });
    req.flash("success", "Import thành công!");
    res.redirect("/admin/importExcelCourse");
  }
);
//Import Excel User
router.get("/importExcelUser", AuthMiddleware, UserController.importExcelUser);
router.post(
  "/importExcelUser",
  upload.single("excelFile"),
  async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      const data = row.values;
      console.log("DataExcel:", data);
      console.log("du lieu data excel", parseInt(data[3]));
      if (rowNumber !== 1) {
        await User.create({
          name: data[2],
          email: data[3],
          phone: parseInt(data[4]),
          address: data[5],
          // typeId: parseInt(data[6]),
        });
      }
    });
    req.flash("success", "Import thành công!");
    res.redirect("/admin/importExcelUser");
  }
);
//Import Excel Class
router.get(
  "/importExcelClass",
  AuthMiddleware,
  ClassController.importExcelClass
);
router.post(
  "/importExcelClass",
  upload.single("excelFile"),
  async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
      const data = row.values;
      console.log("DataExcel:", data);
      console.log("du lieu data excel", parseInt(data[3]));
      if (rowNumber !== 1) {
        await Classes.create({
          name: data[2],
          quantity: parseInt(data[3]),
          startDate: data[4],
          endDate: data[5],
          courseId: parseInt(data[7]),
          // typeId: parseInt(data[6]),
        });
      }
    });
    req.flash("success", "Import thành công!");
    res.redirect("/admin/importExcelClass");
  }
);

router.get("/classList", ClassController.classList);
router.get("/createClass", ClassController.createClass);
router.post(
  "/createClass",
  ClassesValidateMiddleware(),
  ClassController.handleCreateClass
);
router.get("/editClass/:id", ClassController.editClass);
router.post(
  "/editClass/:id",
  EditClassesValidateMiddleware,
  ClassController.handleEditClass
);
router.post("/deleteClass/:id", ClassController.deleteClass);
router.post("/deleteAllClass", ClassController.deleteAllClass);
router.get("/exportClass", ClassController.exportClass);
router.get("/courseDetail/:id", CourseController.courseDetails);
router.get("/classDetail/:id", ClassController.classDetails);
router.get("/teacherDetail/:id", UserController.teacherDetail);
router.get("/studentDetail/:id", UserController.studentDetail);
router.get("/createStudentClass/:id", ClassController.createStudentClass);
router.post(
  "/createStudentClass/:id",
  ClassController.handleCreateStudentClass
);
router.get("/addDocument/:id", CourseController.addDocuments);
router.post("/addDocument/:id", CourseController.handleAddDocuments);
router.get("/addMoreDocument/:id", CourseController.addMoreDocument);
router.post("/addMoreDocument/:id", CourseController.handleAddMoreDocument);
router.get("/editModuleDocument/:id", CourseController.editModuleDocument);
router.post(
  "/editModuleDocument/:id",
  CourseController.handleEditModuleDocument
);
router.get("/deleteAllDocument/:id", CourseController.deleleAllDocument);
router.get("/deleteDocument/:id", CourseController.deleleDocument);
router.get("/exportClass", ClassController.exportClass);
// router.get("/teacher/calendar/:id", UserController.teacherCalendarAll);
router.get("/teacher/calendar/:id", UserController.teacherCalendar);
router.get("/student/attendance/class/:id", UserController.studentAttendance);
router.get("/class/excersise/:id", ClassController.excersiseClass);
router.get(
  "/class/excersiseDetail/:id",
  AuthMiddleware,
  ClassController.excersiseClassDetail
);
router.post(
  "/class/excersiseDetail/:id",
  ClassController.handleCommentExcersise
);
router.post("/class/destroy/comment/:id", ClassController.deleteComment);
router.get("/class/CreateExcersise/:id", ClassController.createExcersise);
router.post(
  "/class/CreateExcersise/:id",
  ClassController.handleCreateExcersise
);
router.get("/class/editComment/:id", ClassController.editComment);
router.post("/class/editComment/:id", ClassController.handleEditComment);
router.get("/users/permission/:id", UserController.permission);
router.post("/users/permission/:id", UserController.handlePermission);
router.get("/users/roles", UserController.roles);
router.get("/roles/add", UserController.addRole);
router.post("/roles/add", UserController.handleAddRole);
router.get("/roles/edit/:id", UserController.editRole);
router.post("/roles/edit/:id", UserController.handleEditRole);
router.post("/roles/delete/:id", UserController.deleteRole);
router.get("/class/listStudent/:id", ClassController.listStudentClass);
router.post("/class/deleteStudent/:id", ClassController.deleteStudentClass);
module.exports = router;
