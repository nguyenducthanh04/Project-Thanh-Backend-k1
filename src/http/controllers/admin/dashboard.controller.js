const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
// const flash = require("connect-flash");
const moment = require("moment");
const { getUrl } = require("../../../utils/getUrl");
const { validationResult } = require("express-validator");
const { isPermission } = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
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
    const permissions = await permissionUser(req);
    res.render("admin/dashboard/index", {
      user,
      req,
      studentQuantity,
      teacherQuantity,
      courseQuantity,
      classQuantity,
      moduleName,
      title,
      permissions,
      isPermission,
    });
  }
  //Change Profile
  async changeProfile(req, res) {
    const user = req.user;
    const title = "";
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const permissions = await permissionUser(req);
    res.render("admin/settings/changeProfile", {
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
      permissions,
      isPermission,
    });
  }
  async handleChangeProfile(req, res) {
    const user = req.user;
    const { name, email, address, phone } = req.body;
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
    const permissions = await permissionUser(req);
    res.render("admin/settings/changePass", {
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
      permissions,
      isPermission,
    });
  }
  async handleChangePass(req, res) {
    const users = req.user;
    // const email = users.email
    const salt = 10;
    // const user = req.flash("user");
    const { oldpassword, password, resetpassword } = req.body;
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
    const socials = userSocials.map((social) => social.dataValues.provider);
    const permissions = await permissionUser(req);
    res.render("admin/settings/index", {
      socials,
      user,
      req,
      msg,
      msgType,
      success,
      moduleName,
      title,
      permissions,
      isPermission,
    });
  }
  //Delete Social
  async deleteSocialGoogle(req, res) {
    const provider = "google";
    const user = req.user;
    user_socials.destroy({
      where: {
        userId: user.id,
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
}
module.exports = new DashboardController();
