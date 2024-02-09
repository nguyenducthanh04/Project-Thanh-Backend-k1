const model = require("../../../models/index");
const User = model.User;
const Classes = model.classes;
const Courses = model.courses;
const CourseModule = model.course_modules;
const ModuleDocument = model.module_document;
const { Op, where } = require("sequelize");
const Schedule = model.scheduleclasses;
const Excersise = model.exercises;
const moment = require("moment");
const Comments = model.comments;
const { isPermission } = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
const classService = require("../../services/classService");
const courseService = require("../../services/courseService");
const moduleName = "";
class TeacherController {
  async index(req, res) {
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
  }
  async ClassTeacher(req, res) {
    const title = "Danh sách lớp học phụ trách";
    const { id } = req.params;
    const user = req.user;
    const userId = user.id;
    console.log("teacherId:", userId);
    // const teacherLists = await User.findOne({
    //   where: {
    //     typeId: 2,
    //     id: id,
    //   },
    // });
    const classTeacher = await User.findByPk(userId, {
      include: {
        model: Classes,
      },
    });
    const permissions = await permissionUser(req);
    console.log("okTeacher:", classTeacher);
    const classTeacherList = classTeacher.classes;
    console.log("0810:", classTeacherList);
    // console.log("haha:", teacherLists.name);
    const schedules = await Schedule.findAll({
      include: {
        model: Classes,
      },
    });
    console.log("okeae:", schedules);
    res.render("teachers/home/classTeacher", {
      title,
      moduleName,
      classTeacherList,
      schedules,
      permissions,
      isPermission,
      moment,
    });
  }
  async classTeacherDetail(req, res) {
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
    console.log("classDetail:", classList);
    console.log("course:", courseList);
    console.log("schedule:", scheduleList);
    res.render("teachers/home/classDetail", {
      title,
      moduleName,
      permissions,
      isPermission,
      classList,
      courseList,
      scheduleList,
      moment,
    });
  }
  async classExcersise(req, res) {
    const title = "";
    const { id } = req.params;
    let excersiseList = await Excersise.findAll({
      where: {
        classId: id,
      },
    });
    console.log("excersise: ", excersiseList);
    const permissions = await permissionUser(req);
    res.render("teachers/home/classExcersise", {
      title,
      moduleName,
      excersiseList,
      id,
      permissions,
      isPermission,
    });
  }
  async createExcersise(req, res) {
    const title = "";
    const permissions = await permissionUser(req);
    res.render("teachers/home/createExcersise", {
      title,
      moduleName,
      permissions,
      isPermission,
    });
  }
  async handleCreateExcersise(req, res) {
    const classId = req.params.id;
    const { title, content, attachment } = req.body;
    await Excersise.create({
      classId: classId,
      title: title,
      content: content,
      attachment: attachment,
    });
    res.redirect(`/teacher/class/CreateExcersise/${classId}`);
  }
  async excersiseClassDetail(req, res) {
    const title = "";
    const user = req.user;
    console.log("user", user);
    const { id } = req.params;
    console.log("id", typeof id);
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
    console.log("Tet", commentAll);
    // console.log("excersise: ", excersiseList);
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
    });
  }
  async handleCommentExcersise(req, res) {
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
  }
  async coursesList(req, res) {
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
    console.log("ok:", CoursesList);
    const permissions = await permissionUser(req);
    res.render("teachers/home/coursesTeacher", {
      title,
      moduleName,
      permissions,
      isPermission,
      CoursesList,
    });
  }
  async courseDetail(req, res) {
    const title = "";
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
    console.log("courseList:", CourseList);
    console.log("module:", Modules);
    const permissions = await permissionUser(req);
    res.render("teachers/home/courseDetail", {
      title,
      moduleName,
      permissions,
      isPermission,
      Modules,
      CourseList,
    });
  }
  async addDocuments(req, res) {
    const title = "";
    const permissions = await permissionUser(req);
    res.render("teachers/home/addDocument", {
      title,
      moduleName,
      permissions,
      isPermission,
    });
  }
  async handleAddDocuments(req, res) {
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
  }
  async addMoreDocument(req, res) {
    const title = "";
    const permissions = await permissionUser(req);
    res.render("teachers/home/addMoreDocument", {
      title,
      moduleName,
      permissions,
      isPermission,
    });
  }
  async handleAddMoreDocument(req, res) {
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
  }
}
module.exports = new TeacherController();
