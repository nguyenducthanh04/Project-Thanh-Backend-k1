// const model = require("../../../models/index");
const model = require("../../../models/index");
const User = model.User;
const Classes = model.classes;
const Courses = model.courses;
const CourseModule = model.course_modules;
const ModuleDocument = model.module_document;
const { Op, where } = require("sequelize");
const StudentClass = model.students_classes;
const Schedule = model.scheduleclasses;
const Excersise = model.exercises;
const LearningStatus = model.learning_status;
const StudentStatus = model.student_status;
const moment = require("moment");
const Comments = model.comments;
const StudentAttendance = model.students_attendance;
const TeacherCalendar = model.teacher_calendar;
const classService = require("../../services/classService");
const courseService = require("../../services/courseService");
const moduleName = "";
const { isPermission } = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
class StudentController {
  async index(req, res) {
    const title = "";
    const user = req.user;
    const permissions = await permissionUser(req);
    res.render("students/home/index", {
      user,
      req,
      moduleName,
      title,
      isPermission,
      permissions,
    });
  }
  changePass(req, res) {
    const user = req.user;
    res.render("students/settings/changePass", {
      user,
      req,
      title,
      moduleName,
    });
  }
  async ClassStudent(req, res) {
    const title = "Danh sách lớp học đang tham gia";
    const { id } = req.params;
    const user = req.user;
    const userId = user.id;
    const classStudent = await StudentClass.findAll({
      where: {
        studentId: userId,
      },
      include: {
        model: Classes,
      },
    });
    const permissions = await permissionUser(req);
    const classTeacherList = classStudent.classes;
    const schedules = await Schedule.findAll({
      include: {
        model: Classes,
      },
    });
    res.render("students/home/classStudent", {
      title,
      moduleName,
      classStudent,
      classTeacherList,
      schedules,
      permissions,
      isPermission,
      moment,
    });
  }
  async classStudentDetail(req, res) {
    const title = "";
    const { id } = req.params;
    const classList = await classService.getClassByPk(id);
    const courseList = await courseService.getCourseById(classList.course.id);
    const scheduleList = await Schedule.findAll({
      where: {
        classId: id,
      },
    });
    const permissions = await permissionUser(req);
    res.render("students/home/classDetail", {
      title,
      moduleName,
      permissions,
      isPermission,
      classList,
      scheduleList,
      moment,
      courseList,
    });
  }
  async attendance(req, res) {
    const title = "";
    const user = req.user;
    const classId = req.params.id;
    const classItem = await Classes.findByPk(classId, {
      include: [
        {
          model: TeacherCalendar,
        },
        {
          model: StudentClass,
          include: {
            model: User,
          },
        },
      ],
    });
    const TeacherCalendars = classItem.teacher_calendars;
    const StudentClassList = classItem.students_classes;
    const studentAtend = await StudentAttendance.findAll({
      where: {
        classId: classId,
      },
      attributes: {
        exclude: ["learningStatusId"],
      },
    });
    const arrayAttendances = [];
    studentAtend.forEach((attendance) => {
      const data = `${moment(attendance.dateLearning).format("YYYY-MM-DD")}||${
        attendance.studentId
      }||${attendance.classId}${attendance.status}`;
      arrayAttendances.push(data);
    });
    const permissions = await permissionUser(req);
    res.render("classes/attendance", {
      title,
      isPermission,
      permissions,
      moduleName,
      user,
      classItem,
      TeacherCalendars,
      StudentClassList,
      arrayAttendances,
      moment,
    });
  }
}
module.exports = new StudentController();
