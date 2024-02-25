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
    try {
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
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async changePass(req, res) {
    try {
      const user = req.user;
      const permissions = await permissionUser(req);
      res.render("students/settings/changePass", {
        user,
        req,
        title,
        isPermission,
        moduleName,
        permissions,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async ClassStudent(req, res) {
    try {
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
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async classStudentDetail(req, res) {
    try {
      const title = "";
      const user = req.user;
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
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async attendance(req, res) {
    try {
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
        const data = `${moment(attendance.dateLearning).format(
          "YYYY-MM-DD"
        )}||${attendance.studentId}||${attendance.classId}${attendance.status}`;
        arrayAttendances.push(data);
      });
      const permissions = await permissionUser(req);
      res.render("students/home/attendance", {
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
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async studentCourses(req, res) {
    try {
      const title = "";
      const user = req.user;
      const studentId = req.user.id;
      const studentClass = await StudentClass.findAll({
        where: {
          studentId: studentId,
        },
        include: [
          {
            model: Classes,
            include: [
              {
                model: Courses,
                include: [
                  {
                    model: User, // Eager load User data linked with Courses
                  },
                ],
              },
            ],
          },
        ],
      });
      const permissions = await permissionUser(req);
      res.render("students/home/studentCourses", {
        title,
        moduleName,
        isPermission,
        permissions,
        user,
        studentClass,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async courseDetail(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      const CourseList = await courseService.getCourseById(id);
      const Modules = await CourseModule.findAll({
        where: {
          courseId: CourseList.id,
        },
        include: {
          model: ModuleDocument,
        },
      });
      const permissions = await permissionUser(req);
      res.render("students/home/courseDetail", {
        title,
        moduleName,
        permissions,
        isPermission,
        Modules,
        CourseList,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async classExcersise(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      let excersiseList = await Excersise.findAll({
        where: {
          classId: id,
        },
      });
      const permissions = await permissionUser(req);
      res.render("students/home/classExcersise", {
        title,
        moduleName,
        excersiseList,
        id,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async excersiseClassDetail(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      let excersiseList = await Excersise.findAll({
        where: {
          id: id,
        },
      });
      const commentAll = await Comments.findAll({
        where: {
          title: id,
          parentId: {
            [Op.is]: null,
          },
        },
        include: {
          model: User,
        },
      });
      const commentChild = await Comments.findAll({
        where: {
          title: id,
          parentId: {
            [Op.not]: null,
          },
        },
        include: {
          model: User,
        },
      });
      const permissions = await permissionUser(req);
      res.render("students/home/excersiseDetail", {
        title,
        moduleName,
        excersiseList,
        commentAll,
        commentChild,
        user,
        permissions,
        isPermission,
        moment,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleCommentExcersise(req, res) {
    try {
      const user = req.user;
      const { id } = req.params;
      const { parentId } = req.body;
      const classExcersise = await Excersise.findByPk(id);
      const { content } = req.body;
      await Comments.create({
        classId: classExcersise.classId,
        title: id,
        content: content,
        parentId: parentId,
        studentId: user.id,
      });
      res.redirect(`/teacher/class/excersiseDetail/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
}
module.exports = new StudentController();
