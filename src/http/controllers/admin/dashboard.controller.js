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
const moduleName = "Tổng quan";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
upload.single("excelFile");

class DashboardController {
  async index(req, res) {
    const title = "Tổng quan";
    const user = req.user;
    console.log("userDash", user);
    const studentQuantity = await User.count({
      where: {
        typeId: 3,
      },
    });
    const teacherQuantity = await User.count({
      where: {
        typeId: 2,
      },
    });
    const courseQuantity = await Courses.count();
    const classQuantity = await Classes.count();
    res.render("admin/dashboard/index", {
      user,
      req,
      studentQuantity,
      teacherQuantity,
      courseQuantity,
      classQuantity,
      moduleName,
      title,
    });
  }
  //Change Profile
  async changeProfile(req, res) {
    const user = req.user;
    const title = "";
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    res.render("admin/settings/changeProfile", {
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
    });
  }
  async handleChangeProfile(req, res) {
    const user = req.user;
    const { name, email, address, phone } = req.body;
    // console.log(name, email, address, phone)
    const value = await User.update(
      {
        name: name,
        email: email,
        address: address,
        phone: phone,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    if (value) {
      console.log("Update thanh cong");
      req.flash("success", "Thay đổi thông tin thành công!");
      res.redirect("/admin/changeProfile");
      return;
    }
    return;
  }
  //Change Pass
  async changePassword(req, res) {
    const user = req.user;
    const title = "";
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    res.render("admin/settings/changePass", {
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
    });
  }
  async handleChangePass(req, res) {
    const users = req.user;
    // const email = users.email
    const salt = 10;
    // const user = req.flash("user");
    const { oldpassword, password, resetpassword } = req.body;
    // console.log(req.user.password);
    console.log(users);
    // console.log(email);
    // console.log(users.password);
    // console.log(req.user.email.dataValues);
    console.log(oldpassword, password, resetpassword);
    if (password !== resetpassword) {
      req.flash("error", "Mật khẩu không khớp");
      res.redirect(`/admin/changePass`);
      return;
    }
    bcrypt.hash(password, salt, async function (err, hash) {
      const value = await User.update(
        { password: hash },
        {
          where: {
            email: users.email,
          },
        }
      );
      if (value) {
        console.log("Update thanh cong");
        req.flash("success", "Cập nhập mật khẩu thành công!");
        res.redirect("/admin/changePass");
        return;
      }
    });
    return;
  }
  //Setting
  async settingAdmin(req, res) {
    const user = req.user;
    const title = "";
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const userSocials = await user_socials.findAll({
      where: {
        userId: req.user.id,
      },
    });
    console.log(userSocials);
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(socials);
    res.render("admin/settings/index", {
      socials,
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
    });
  }
  //Delete Social
  async deleteSocialGoogle(req, res) {
    const provider = "google";
    user_socials.destroy({
      where: {
        provider: provider,
      },
    });
    return res.redirect("/admin/settings");
  }
  async deleteSocialGithub(req, res) {
    const provider = "github";
    user_socials.destroy({
      where: {
        provider: provider,
      },
    });
    return res.redirect("/admin/settings");
  }

  async exportClasses(req, res) {
    const classList = await classService.getAllClass();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Số lượng", key: "quantity", width: 40 },
      { header: "Ngày khai giảng", key: "startDate", width: 30 },
      { header: "Ngày bế giảng", key: "endDate", width: 30 },
      { header: "Lịch học", key: "schedule", width: 30 },
      { header: "Khóa học", key: "courseId", width: 30 },
      { header: "Thời gian học", key: "timeLearn", width: 30 },
    ];
    classList.forEach((user) => {
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
}
module.exports = new DashboardController();
