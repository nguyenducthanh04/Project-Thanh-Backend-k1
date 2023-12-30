var express = require("express");
var router = express.Router();
const model = require("../../models/index");
const Courses = model.courses;
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
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
const UserValidateMiddleware = require("../../http/middlewares/user.validate.middleware");
const CourseValidateMiddleware = require("../../http/middlewares/course.validate.middleware");
const AdminController = require("../../http/controllers/admin/dashboard.controller");
/* GET home page. */
router.get("/", AuthMiddleware, DashboardController.index);
router.get("/deleteSocial", AdminController.deleteSocial);
router.get("/deleteSocialGithub", AdminController.deleteSocialGithub);
router.get("/changeProfile", AuthMiddleware, AdminController.changeProfile);
router.post(
  "/changeProfile",
  AuthMiddleware,
  AdminController.handleChangeProfile
);
router.get("/account", AuthMiddleware, AdminController.account);
router.get("/settings", AuthMiddleware, AdminController.settingAdmin);
router.get("/changePass", AuthMiddleware, AdminController.changePassword);
router.post("/changePass", AdminController.handleChangePass);
router.get("/userList", AuthMiddleware, AdminController.userList);
router.get("/teacherList", AuthMiddleware, AdminController.teacherList);
router.get("/studentList", AuthMiddleware, AdminController.studentList);
router.get("/createUser", AuthMiddleware, AdminController.createUser);
router.post(
  "/createUser",
  UserValidateMiddleware(),
  AdminController.handleCreateUser
);
router.get("/editUser/:id", AuthMiddleware, AdminController.editUser);
router.post("/editUser/:id", AdminController.handleEditUser);
router.post("/deleteUser/:id", AdminController.deleteUser);
router.get("/courseList", AuthMiddleware, AdminController.courseList);
router.get("/editCourse/:id", AuthMiddleware, AdminController.editCourse);
router.post("/editCourse/:id", AdminController.handleEditCourse);
router.post("/deleteCourse/:id", AdminController.deleteCourse);
router.get("/createCourse", AuthMiddleware, AdminController.createCourse);
router.post(
  "/createCourse",
  CourseValidateMiddleware(),
  AdminController.handleCreateCourse
);
router.get("/exportStudent", AdminController.exportStudent);
router.get("/exportAdmin", AdminController.exportAdmin);
router.get("/exportTeacher", AdminController.exportTeacher);
router.get("/exportCourse", AdminController.exportCourse);
router.post("/deleteAll", AdminController.deleteAll);
router.post("/deleteAllStudents", AdminController.deleteAllStudents);
router.get("/importExcel", AdminController.importExcelUser);
router.post("/importExcel", upload.single("excelFile"), async (req, res) => {
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

  res.send("Import thành công!");
});

module.exports = router;
