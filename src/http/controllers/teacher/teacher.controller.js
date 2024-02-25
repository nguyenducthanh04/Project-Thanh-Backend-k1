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
const { isPermission } = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
const classService = require("../../services/classService");
const courseService = require("../../services/courseService");
const moduleName = "";
class TeacherController {
  async index(req, res) {
    try {
      const user = req.user;
      const title = "";
      const permissions = await permissionUser(req);
      res.render("teachers/home/index", {
        user,
        req,
        title,
        moduleName,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async ClassTeacher(req, res) {
    try {
      const title = "Danh sách lớp học phụ trách";
      const { id } = req.params;
      const user = req.user;
      const userId = user.id;
      const classTeacher = await User.findByPk(userId, {
        include: {
          model: Classes,
        },
      });
      const permissions = await permissionUser(req);
      const classTeacherList = classTeacher.classes;
      const schedules = await Schedule.findAll({
        include: {
          model: Classes,
        },
      });
      res.render("teachers/home/classTeacher", {
        title,
        moduleName,
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
  async classTeacherDetail(req, res) {
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
      res.render("teachers/home/classDetail", {
        title,
        moduleName,
        permissions,
        isPermission,
        classList,
        courseList,
        scheduleList,
        moment,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async classExcersise(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      let excersiseList = await Excersise.findAll({
        where: {
          classId: id,
        },
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/classExcersise", {
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
  async createExcersise(req, res) {
    try {
      const title = "";
      const user = req.user;
      const permissions = await permissionUser(req);
      res.render("teachers/home/createExcersise", {
        title,
        moduleName,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleCreateExcersise(req, res) {
    try {
      const classId = req.params.id;
      const { title, content, attachment } = req.body;
      await Excersise.create({
        classId: classId,
        title: title,
        content: content,
        attachment: attachment,
      });
      res.redirect(`/teacher/class/CreateExcersise/${classId}`);
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
      res.render("teachers/home/excersiseDetail", {
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
  async coursesList(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      const userId = user.id;
      const CoursesList = await Courses.findAll({
        where: {
          teacherId: userId,
        },
        include: {
          model: User,
        },
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/coursesTeacher", {
        title,
        moduleName,
        permissions,
        isPermission,
        CoursesList,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async courseDetail(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
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
      res.render("teachers/home/courseDetail", {
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
  async addDocuments(req, res) {
    try {
      const title = "";
      const user = req.user;
      const permissions = await permissionUser(req);
      res.render("teachers/home/addDocument", {
        title,
        moduleName,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleAddDocuments(req, res) {
    try {
      const { name, pathName } = req.body;
      const { id } = req.params;
      const module = await CourseModule.create({
        name: name,
        courseId: id,
      });
      await ModuleDocument.create({
        pathName: pathName,
        moduleId: module.id,
      });
      res.redirect(`/teacher/addDocument/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async addMoreDocument(req, res) {
    try {
      const title = "";
      const user = req.user;
      const permissions = await permissionUser(req);
      res.render("teachers/home/addMoreDocument", {
        title,
        moduleName,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleAddMoreDocument(req, res) {
    try {
      const { id } = req.params;
      const { pathName } = req.body;
      const courseModule = await CourseModule.findOne({
        where: {
          id,
        },
      });
      await ModuleDocument.create({
        pathName: pathName,
        moduleId: id,
      });
      res.redirect(`/teacher/addMoreDocument/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async listStudentClass(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      const listStudent = await StudentClass.findAll({
        where: {
          classId: id,
        },
        include: [
          {
            model: User,
          },
          {
            model: LearningStatus,
          },
        ],
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/listStudentClass", {
        title,
        moduleName,
        permissions,
        isPermission,
        listStudent,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async editModuleDocument(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      const Modules = await CourseModule.findByPk(id, {
        include: {
          model: ModuleDocument,
        },
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/editModuleDocument", {
        title,
        moduleName,
        Modules,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleEditModuleDocument(req, res) {
    try {
      const { name, pathName } = req.body;
      const { id } = req.params;
      await CourseModule.update(
        { name: name },
        {
          where: {
            id: id,
          },
        }
      );
      await ModuleDocument.destroy({
        where: {
          moduleId: id,
        },
      });
      if (pathName.length === 1) {
        await ModuleDocument.create({
          pathName: pathName,
          moduleId: id,
        });
      } else {
        for (let i = 0; i < pathName.length; i++) {
          await ModuleDocument.create({
            pathName: pathName[i],
            moduleId: id,
          });
        }
      }
      res.redirect(`/teacher/editModuleDocument/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async studentClassDetail(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      const studentLists = await StudentClass.findOne({
        where: {
          id: id,
        },
        include: {
          model: User,
        },
      });
      const statusList = await LearningStatus.findAll();
      const permissions = await permissionUser(req);
      res.render("teachers/home/studentDetail", {
        studentLists,
        title,
        moduleName,
        user,
        permissions,
        statusList,
        isPermission,
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
      res.render("teachers/home/attendance", {
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
  async handleAttendance(req, res) {
    try {
      const classId = req.params.id;
      const { attendance } = req.body;
      const deleteStudent = await StudentAttendance.destroy({
        where: {
          classId: classId,
        },
      });
      for (let elm of attendance) {
        if (elm) {
          const attendanceItem = elm.split("||");
          await StudentAttendance.create({
            dateLearning: attendanceItem[0],
            studentId: +attendanceItem[1],
            classId: +classId,
            status: +attendanceItem[2],
          });
        }
      }
      res.redirect(`/teacher/class/attendance/${classId}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async updateStatusStudent(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      const studentInfo = await StudentClass.findByPk(id, {
        include: {
          model: User,
        },
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/updateStatus", {
        title,
        user,
        moduleName,
        isPermission,
        permissions,
        studentInfo,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleUpdateStatusStudent(req, res) {
    try {
      const id = req.params.id;
      const { statusId } = req.body;
      await StudentClass.update(
        { statusId: statusId },
        {
          where: {
            id: id,
          },
        }
      );
      res.redirect(`/teacher/student/updateStatus/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
}
module.exports = new TeacherController();
