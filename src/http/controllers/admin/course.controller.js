const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
// const flash = require("connect-flash");
const moment = require("moment");
const { getUrl } = require("../../../utils/getUrl");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const user_socials = model.user_socials;
const User = model.User;
const type = model.types;
const Courses = model.courses;
const Classes = model.classes;
const CourseModule = model.course_modules;
const ModuleDocument = model.module_document;
const { getError } = require("../../../utils/validate");
const { make } = require("../../../utils/hash");
const ExcelJS = require("exceljs");
const userService = require("../../../http/services/userService");
const typeService = require("../../services/typeService");
const courseService = require("../../services/courseService");
const classService = require("../../services/classService");
const moduleName = "Khóa học";

class CourseController {
  async courseList(req, res) {
    const title = "Danh sách";
    // const courseList = await Courses.findAll();
    const user = req.user;
    const msg = req.flash("error");
    const typeMsg = msg ? "danger" : "success";
    const success = req.flash("success");
    const { keyword } = req.query;
    console.log(keyword);
    const filters = {};
    if (keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          "$User.name$": {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }
    const totalCountObj = await Courses.findAndCountAll({
      include: {
        model: User,
      },
      where: filters,
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    console.log(`totalCount ${totalCount}`);
    //Tính tổng số trang
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(`totalPage ${totalPage}`);

    //Lấy trang hiện tại
    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    console.log(offset);
    const courseList = await Courses.findAll({
      include: {
        model: User,
      },
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });
    console.log("1111111:", courseList);

    res.render("admin/manager.course/courseList", {
      courseList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      msg,
      typeMsg,
      success,
      moduleName,
      title,
    });
  }
  //Create Course
  async createCourse(req, res) {
    const user = req.user;
    const title = "Thêm mới khóa học";
    const courseList = await courseService.getAllCourses();
    const teacherList = await userService.getAllTeacher();
    const message = req.flash("message");
    const errors = req.flash("errors");
    console.log(req.flash("message"));
    console.log(getError(errors, "name"));
    res.render("admin/manager.course/createCourse", {
      teacherList,
      message,
      errors,
      getError,
      courseList,
      user,
      title,
      moduleName,
    });
  }
  async handleCreateCourse(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Courses.create(req.body);
      return res.redirect("/admin/createCourse");
    } else {
      req.flash("errors", errors.array());
      req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      console.log(errors.array());
      res.redirect("/admin/createCourse");
    }
  }
  //Edit Course
  async editCourse(req, res) {
    const title = "";
    const { id } = req.params;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const courseDetail = await courseService.getCourseById(id);
    const teacher = courseDetail.User.name;
    console.log("Ten giao vien", teacher);
    const teacherList = await userService.getAllTeacher();
    console.log(`Danh sách teacher: ${teacherList}`);
    res.render("admin/manager.course/editCourse", {
      courseDetail,
      teacher,
      teacherList,
      msg,
      msgType,
      success,
      moduleName,
      title,
    });
  }
  async handleEditCourse(req, res) {
    const { id } = req.params;
    const courseData = req.body;
    console.log("reqbody:", courseData);
    await Courses.update(courseData, {
      where: {
        id: id,
      },
    });
    console.log("Cập nhật thành công");
    req.flash("success", "Cập nhật thông tin khóa học thành công!");
    res.redirect(`/admin/editCourse/${id}`);
  }
  //Delete Course
  async deleteCourse(req, res) {
    const { id } = req.params;
    await Courses.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Đã xóa thành công khóa học!");
    res.redirect("/admin/courseList");
  }
  //DeleteAll Course
  async deleteAllCourses(req, res) {
    const { listUserDelete } = req.body;
    const listArr = listUserDelete.split(",");
    await Courses.destroy({
      where: {
        id: {
          [Op.in]: listArr,
        },
      },
    });
    res.redirect("/admin/courseList");
  }
  //Export Course
  async exportCourse(req, res) {
    const courseList = await courseService.getAllCourses();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Học phí", key: "price", width: 40 },
      { header: "Giảng viên", key: "teacherId", width: 30 },
      { header: "Số lượng học viên", key: "quantity", width: 30 },
      { header: "Thời gian học", key: "duration", width: 30 },
    ];
    courseList.forEach((user) => {
      worksheet.addRow(user);
    });
    workbook.xlsx
      .writeBuffer()
      .then((data) => {
        // Gửi file Excel cho người dùng để tải xuống
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
        res.send(Buffer.from(data, "binary"));
      })
      .catch((err) => {
        console.error("Lỗi khi tạo file Excel: ", err);
        res.status(500).send("Đã xảy ra lỗi khi tạo file Excel");
      });
  }
  //Import Course
  importExcelCourse(req, res) {
    const title = "";
    return res.render("admin/importExcelCourse", { moduleName, title });
  }
  async courseDetails(req, res) {
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
    res.render("courses/index", { CourseList, moduleName, title, Modules });
  }
  async addDocuments(req, res) {
    const title = "";
    res.render("courses/addDocument", { title, moduleName });
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
    res.redirect(`/admin/addDocument/${id}`);
  }
  async addMoreDocument(req, res) {
    const title = "";
    res.render("courses/addMoreDocument", { title, moduleName });
  }
  async handleAddMoreDocument(req, res) {
    const { id } = req.params;
    const { pathName } = req.body;
    console.log("id test:", id);
    const courseModule = await CourseModule.findOne({
      where: {
        id,
      },
    });
    console.log("tessttt:", courseModule);
    await ModuleDocument.create({
      pathName: pathName,
      moduleId: id,
    });
    res.send("Ok");
  }
  async editModuleDocument(req, res) {
    const title = "";
    const { id } = req.params;
    const Modules = await CourseModule.findByPk(id, {
      include: {
        model: ModuleDocument,
      },
    });
    console.log("log id:", Modules);
    res.render("courses/editModuleDocument", { title, moduleName, Modules });
  }
  async handleEditModuleDocument(req, res) {
    const { name, pathName } = req.body;
    console.log("pathname:", pathName);
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
    res.send("edit");
  }
  async deleleAllDocument(req, res) {
    const { id } = req.params;
    const deleteCourseModule = await CourseModule.destroy({
      where: {
        id,
      },
    });
    res.send("ok");
  }
}
module.exports = new CourseController();
