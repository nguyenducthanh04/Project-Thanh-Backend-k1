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
const { getError } = require("../../../utils/validate");
const { make } = require("../../../utils/hash");
const ExcelJS = require("exceljs");
const userService = require("../../../http/services/userService");
const typeService = require("../../services/typeService");
const courseService = require("../../services/courseService");
const classService = require("../../services/classService");
const moduleName = "Người dùng";

class UserController {
  //Quản lý admin
  async userList(req, res) {
    const title = "Danh sách người quản trị";
    const user = req.user;
    const msg = req.flash("error");
    const typeMsg = msg ? "danger" : "success";
    const success = req.flash("success");
    const { keyword, typeId } = req.query;
    // console.log(keyword, typeId);
    const filters = {};
    filters.typeId = 1;
    if (typeId === "teacher" || typeId === "student" || typeId === "admin") {
      // filters.typeId = typeId === 'teacher' ? 2 : 3;
      if (typeId === "admin") {
        filters.typeId = 1;
      } else if (typeId === "teacher") {
        filters.typeId = 2;
      } else {
        filters.typeId = 3;
      }
    }
    if (keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
      // filters.name = {
      //   [Op.like] : `%${keyword}%`
      // }
    }
    console.log(filters);
    const totalCountObj = await User.findAndCountAll({
      where: filters,
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      // where: {
      //   typeId: {
      //     [Op.or]: [2, 3]
      //   }
      // }
      where: filters,

      limit: +PER_PAGE,
      offset: offset,
    });
    console.log(await User.count()); //lay tong so ban ghi
    res.render("admin/manager.user/userList", {
      userList,
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
  //Quản lý học viên
  async studentList(req, res) {
    const title = "Danh sách học viên";
    const user = req.user;
    const { keyword, typeId } = req.query;
    console.log("login keyword", keyword, typeId);
    const filters = {};
    filters.typeId = 3;
    if (typeId === "teacher" || typeId === "student" || typeId === "admin") {
      // filters.typeId = typeId === 'teacher' ? 2 : 3;
      if (typeId === "admin") {
        filters.typeId = 1;
      } else if (typeId === "teacher") {
        filters.typeId = 2;
      } else {
        filters.typeId = 3;
      }
    }
    if (keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
      // filters.name = {
      //   [Op.like] : `%${keyword}%`
      // }
    }
    console.log(filters.name);
    console.log(filters.email);
    const totalCountObj = await User.findAndCountAll({
      where: filters,
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });
    console.log("userlist", userList);
    console.log(await User.count()); //lay tong so ban ghi
    res.render("students/home/studentList", {
      userList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      moduleName,
      title,
    });
  }
  //Quản lý giáo viên
  async teacherList(req, res) {
    const title = "Danh sách giảng viên";
    const user = req.user;
    const { keyword, typeId } = req.query;
    console.log("login keyword", keyword, typeId);
    const filters = {};
    filters.typeId = 2;
    if (typeId === "teacher" || typeId === "student" || typeId === "admin") {
      // filters.typeId = typeId === 'teacher' ? 2 : 3;
      if (typeId === "admin") {
        filters.typeId = 1;
      } else if (typeId === "teacher") {
        filters.typeId = 2;
      } else {
        filters.typeId = 3;
      }
    }
    if (keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
      // filters.name = {
      //   [Op.like] : `%${keyword}%`
      // }
    }
    console.log(filters.name);
    console.log(filters.email);
    const totalCountObj = await User.findAndCountAll({
      where: filters,
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let { page } = req.query;
    if (!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      where: filters,

      limit: +PER_PAGE,
      offset: offset,
    });
    console.log("userlist", userList);
    console.log(await User.count()); //lay tong so ban ghi
    console.log(`Tổng số trang: ${totalPage}`);
    res.render("teachers/home/teacherList", {
      userList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      moduleName,
      title,
    });
  }
  //Create User
  async createUser(req, res) {
    const title = "Thêm mới người dùng";
    const user = req.user;
    const typeUser = await typeService.getAllType();
    console.log(`Danh sách typeUser ${typeUser}`);
    const message = req.flash("message");
    const success = req.flash("success");
    const errors = req.flash("errors");
    res.render("admin/manager.user/createUser", {
      typeUser,
      user,
      errors,
      message,
      getError,
      success,
      title,
      moduleName,
    });
  }
  async handleCreateUser(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body.password = make(req.body.password);
      await User.create(req.body);
      req.flash("success", "Thêm thành công!");
      return res.redirect("/admin/createUser");
    } else {
      req.flash("errors", errors.array());
      req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      console.log(errors.array());
      return res.redirect("/admin/createUser");
    }
  }
  //Edit User
  async editUser(req, res) {
    const title = "";
    const user = req.user;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const { id } = req.params;
    const userDetail = await userService.getUserByPk(id);
    const typeList = await typeService.getAllType();
    res.render("admin/manager.user/editUser", {
      userDetail,
      typeList,
      user,
      msg,
      msgType,
      success,
      title,
      moduleName,
    });
  }
  async handleEditUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    await User.update(userData, {
      where: {
        id: id,
      },
    });
    console.log("Cập nhật thành công");
    req.flash("success", "Cập nhật thành công");
    res.redirect(`/admin/editUser/${id}`);
  }
  //Delete User
  async deleteUser(req, res) {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Đã xóa thành công nguời dùng!");
    res.redirect("/admin/userList");
  }
  //Delete All Student
  async deleteAllStudents(req, res) {
    const { listUserDelete } = req.body;
    const listArr = listUserDelete.split(",");
    await User.destroy({
      where: {
        id: {
          [Op.in]: listArr,
        },
      },
    });
    res.redirect("/admin/userList");
  }
  //Export Admin
  async exportAdmin(req, res) {
    const adminList = await userService.getAllAdmin();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      // Thêm các cột khác nếu cần thiết
      { header: "Phone", key: "phone", width: 30 },
      { header: "Address", key: "address", width: 30 },
    ];
    // console.log('Danh sach hoc sinh: ', studentList);
    adminList.forEach((user) => {
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
  //Export Student
  async exportStudent(req, res) {
    const studentList = await userService.getAllStudent();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      // Thêm các cột khác nếu cần thiết
      { header: "Phone", key: "phone", width: 30 },
      { header: "Address", key: "address", width: 30 },
    ];
    // console.log('Danh sach hoc sinh: ', studentList);
    studentList.forEach((user) => {
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
  //Export teacher
  async exportTeacher(req, res) {
    const teacherList = await userService.getAllTeacher();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Email", key: "email", width: 40 },
      { header: "Phone", key: "phone", width: 30 },
      { header: "Address", key: "address", width: 30 },
    ];
    teacherList.forEach((user) => {
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
  importExcelUser(req, res) {
    const title = "";
    return res.render("admin/importExcelUser", { moduleName, title });
  }
}
module.exports = new UserController();
