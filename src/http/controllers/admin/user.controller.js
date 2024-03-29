const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");
const nodemailer = require("nodemailer");
const { PER_PAGE } = process.env;
// const flash = require("connect-flash");
const moment = require("moment");
const { getUrl } = require("../../../utils/getUrl");
const { isPermission } = require("../../../utils/permission");
const permissionUtil = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const user_socials = model.user_socials;
const User = model.User;
const type = model.types;
const Courses = model.courses;
const Classes = model.classes;
const Schedule = model.scheduleclasses;
const Roles = model.roles;
const Permission = model.permissions;
const { differenceInWeeks, parseISO } = require("date-fns");
const TeacherCalendar = model.teacher_calendar;
const StudentClass = model.students_classes;
const { getError } = require("../../../utils/validate");
const { isRole } = require("../../../utils/permission");
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
    try {
      const title = "Danh sách người quản trị";
      const user = req.user;
      const msg = req.flash("error");
      const typeMsg = msg ? "danger" : "success";
      const success = req.flash("success");
      const message = req.flash("message");
      const errors = req.flash("errors");
      const { keyword, typeId } = req.query;
      const filters = {};
      filters.typeId = 1;
      if (typeId === "teacher" || typeId === "student" || typeId === "admin") {
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
      }
      const totalCountObj = await User.findAndCountAll({
        where: filters,
      }); //Lấy tổng số bản ghi
      const totalCount = totalCountObj.count;
      //Tính tổng số trang
      const totalPage = Math.ceil(totalCount / PER_PAGE);
      //Lấy trang hiện tại
      let { page } = req.query;
      if (!page || page < 1 || page > totalPage) {
        page = 1;
      }
      //Tính offset
      const offset = (page - 1) * PER_PAGE;
      const userList = await User.findAll({
        where: filters,

        limit: +PER_PAGE,
        offset: offset,
      });
      const permissions = await permissionUser(req);
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
        permissions,
        isPermission,
        errors,
        message,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Quản lý học viên
  async studentList(req, res) {
    try {
      const title = "Danh sách học viên";
      const user = req.user;
      const { keyword, typeId } = req.query;
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
      }
      const totalCountObj = await User.findAndCountAll({
        where: filters,
      }); //Lấy tổng số bản ghi
      const totalCount = totalCountObj.count;
      //Tính tổng số trang
      const totalPage = Math.ceil(totalCount / PER_PAGE);
      //Lấy trang hiện tại
      let { page } = req.query;
      if (!page || page < 1 || page > totalPage) {
        page = 1;
      }
      //Tính offset
      const offset = (page - 1) * PER_PAGE;
      const userList = await User.findAll({
        where: filters,
        limit: +PER_PAGE,
        offset: offset,
      });
      const permissions = await permissionUser(req);
      res.render("students/home/studentList", {
        userList,
        user,
        req,
        totalPage,
        getUrl,
        page,
        moduleName,
        title,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Quản lý giáo viên
  async teacherList(req, res) {
    try {
      const title = "Danh sách giảng viên";
      const user = req.user;
      const { keyword, typeId } = req.query;
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

      const totalCountObj = await User.findAndCountAll({
        where: filters,
      }); //Lấy tổng số bản ghi
      const totalCount = totalCountObj.count;
      //Tính tổng số trang
      const totalPage = Math.ceil(totalCount / PER_PAGE);
      //Lấy trang hiện tại
      let { page } = req.query;
      if (!page || page < 1 || page > totalPage) {
        page = 1;
      }
      //Tính offset
      const offset = (page - 1) * PER_PAGE;
      const userList = await User.findAll({
        where: filters,

        limit: +PER_PAGE,
        offset: offset,
      });
      const permissions = await permissionUser(req);
      res.render("teachers/home/teacherList", {
        userList,
        user,
        req,
        totalPage,
        getUrl,
        page,
        moduleName,
        title,
        isPermission,
        permissions,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Create User
  async createUser(req, res) {
    try {
      const title = "Thêm mới người dùng";
      const user = req.user;
      const typeUser = await typeService.getAllType();
      const message = req.flash("message");
      const success = req.flash("success");
      const errors = req.flash("errors");
      const permissions = await permissionUser(req);
      res.render("admin/manager.user/createUser", {
        typeUser,
        user,
        errors,
        message,
        getError,
        success,
        title,
        moduleName,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleCreateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const email = req.body.email;
        const { password } = req.body;
        req.body.password = make(req.body.password);
        await User.create(req.body);
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "dducthanh04@gmail.com",
            pass: "midn lcia tcly pcbn",
          },
        });
        transporter.sendMail({
          from: `Thanh Nguyen <dducthanh04@gmail.com>`, // sender address
          to: email, // list of receivers
          subject: "Mật khẩu người dùng", // Subject line
          html: `Mật khẩu của bạn là <strong>${password}</strong>. Vui lòng đăng nhập vào <a href="class.ducthanhdev.id.vn">class.ducthanhdev.id.vn</a> để đổi mật khẩu mới!`, // html body
        });
        req.flash("success", "Thêm thành công!");
        return res.redirect("/admin/createUser");
      } else {
        req.flash("errors", errors.array());
        req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
        return res.redirect("/admin/createUser");
      }
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Edit User
  async editUser(req, res) {
    try {
      const title = "";
      const user = req.user;
      const msg = req.flash("error");
      const msgType = msg ? "danger" : "success";
      const success = req.flash("success");
      const { id } = req.params;
      const userDetail = await userService.getUserByPk(id);
      const typeDetail = userDetail.type.name;
      console.log(typeDetail);
      const typeList = await typeService.getAllType();
      const permissions = await permissionUser(req);
      res.render("admin/manager.user/editUser", {
        userDetail,
        typeList,
        user,
        msg,
        msgType,
        success,
        title,
        moduleName,
        typeDetail,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleEditUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      await User.update(userData, {
        where: {
          id: id,
        },
      });
      req.flash("success", "Cập nhật thông tin người dùng thành công!");
      res.redirect(`/admin/editUser/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Delete User
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({
        where: {
          id: id,
        },
      });
      req.flash("success", "Xóa thành công nguời dùng!");
      res.redirect("/admin/userList");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  //Delete All Student
  async deleteAllStudents(req, res) {
    try {
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
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
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
  async importExcelUser(req, res) {
    try {
      const title = "";
      const user = req.user;
      const permissions = await permissionUser(req);
      return res.render("admin/importExcelUser", {
        moduleName,
        title,
        permissions,
        isPermission,
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async teacherDetail(req, res) {
    try {
      const title = "";
      const user = req.user;
      const { id } = req.params;
      const teacherLists = await User.findOne({
        where: {
          typeId: 2,
          id: id,
        },
      });
      const classTeacher = await User.findByPk(id, {
        include: [
          {
            model: Classes,
            include: [
              {
                model: Courses,
              },
            ],
          },
        ],
      });
      const classTeacherList = classTeacher.classes;
      const permissions = await permissionUser(req);
      res.render("admin/teacher/index", {
        title,
        moduleName,
        teacherLists,
        user,
        classTeacherList,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  // async teacherCalendarAll(req, res) {
  //   const title = "";
  //   const teacherCalendars = await TeacherCalendar.findAll({
  //     include: [
  //       {
  //         model: User,
  //       },
  //       {
  //         model: Classes,
  //       },
  //     ],
  //   });
  //   console.log("calendar", teacherCalendars);
  //   const calendarArray = [];
  //   teacherCalendars.forEach((calendar) => {
  //     console.log("cay", calendar);
  //     calendarArray.push({
  //       title: `${calendar.User.name}(${calendar.class.name})`,
  //       start: calendar.scheduleDate,
  //     });
  //   });
  //   res.render("admin/calendar", { title, moduleName, calendarArray });
  // }
  async teacherCalendar(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      const teacherCalendars = await TeacherCalendar.findAll({
        where: {
          teacherId: id,
        },
        include: [
          {
            model: Classes,
            include: {
              model: Schedule,
            },
          },
        ],
      });
      const calendarArray = [];
      teacherCalendars.forEach((calendar) => {
        calendarArray.push({
          title: calendar.class.name,
          start: calendar.scheduleDate,
        });
      });
      const permissions = await permissionUser(req);
      res.render("admin/calendar", {
        moduleName,
        title,
        user,
        calendarArray,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async studentDetail(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      const studentLists = await User.findOne({
        where: {
          typeId: 3,
          id: id,
        },
      });
      let studentId = id;
      const studentClass = await StudentClass.findAll({
        where: {
          studentId: id,
        },
        include: [
          {
            model: Classes,
            include: [
              {
                model: Courses,
              },
            ],
          },
        ],
      });
      const permissions = await permissionUser(req);
      res.render("admin/student/index", {
        studentLists,
        title,
        moduleName,
        studentClass,
        user,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async studentAttendance(req, res) {
    try {
      const title = "";
      const { id } = req.params;
      const user = req.user;
      const classDate = await Classes.findByPk(id);

      const startDate = classDate.startDate;
      const endDate = classDate.endDate;
      const permissions = await permissionUser(req);
      res.render("admin/student/attendance", {
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
  async permission(req, res) {
    try {
      const title = "";
      const user = req.user;
      const msg = req.flash("error");
      const typeMsg = msg ? "danger" : "success";
      const message = req.flash("message");
      const success = req.flash("success");
      const errors = req.flash("errors");
      const { id } = req.params;
      const roleList = await Roles.findAll();
      const users = await User.findOne({
        where: {
          id,
        },
        include: {
          model: Roles,
        },
      });
      const permissions = await permissionUser(req);
      res.render("admin/permissions/index", {
        title,
        moduleName,
        roleList,
        users,
        user,
        isRole,
        isPermission,
        permissions,
        typeMsg,
        message,
        success,
        errors,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handlePermission(req, res) {
    try {
      const { permission } = req.body;
      let { roles } = req.body;
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        res.redirect("/users");
        return;
      }

      if (roles) {
        roles = typeof roles === "string" ? [roles] : roles;

        const roleUpdate = await Promise.all(
          roles.map((roleId) =>
            Roles.findOne({
              where: {
                id: roleId,
              },
            })
          )
        );

        await user.setRoles(roleUpdate);
      }
      req.flash("success", "Thêm thành công quyền cho người dùng!");
      res.redirect(`/admin/users/permission/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async roles(req, res) {
    try {
      const title = "";
      const user = req.user;
      const msg = req.flash("error");
      const typeMsg = msg ? "danger" : "success";
      const message = req.flash("message");
      const success = req.flash("success");
      const errors = req.flash("errors");
      const roleList = await Roles.findAll();
      const permissions = await permissionUser(req);
      res.render("admin/permissions/roles", {
        title,
        moduleName,
        roleList,
        permissions,
        isPermission,
        user,
        typeMsg,
        message,
        success,
        errors,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async addRole(req, res) {
    try {
      const title = "";
      const msg = req.flash("error");
      const typeMsg = msg ? "danger" : "success";
      const message = req.flash("message");
      const success = req.flash("success");
      const errors = req.flash("errors");
      const user = req.user;
      const permissions = await permissionUser(req);
      res.render("admin/permissions/addRole", {
        title,
        moduleName,
        permissions,
        isPermission,
        user,
        typeMsg,
        success,
        message,
        errors,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleAddRole(req, res) {
    try {
      const { name, permission } = req.body;
      const role = await Roles.create({
        name: name,
      });
      if (permission) {
        let dataPermission = [];
        if (typeof permission === "string") {
          dataPermission.push({
            value: permission,
          });
        } else {
          dataPermission = permission.map((item) => ({ value: item }));
        }
        dataPermission.forEach(async (item) => {
          const permissionIntance = await Permission.findOne({
            where: item,
          });
          if (!permissionIntance) {
            await role.createPermission(item);
          } else {
            await role.addPermission(permissionIntance);
          }
        });
      }
      req.flash("success", "Thêm thành công role!");
      res.redirect("/admin/users/roles");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async editRole(req, res) {
    try {
      const title = "";
      const msg = req.flash("error");
      const typeMsg = msg ? "danger" : "success";
      const message = req.flash("message");
      const success = req.flash("success");
      const errors = req.flash("errors");
      const user = req.user;
      const { id } = req.params;
      const role = await Roles.findOne({
        where: {
          id,
        },
        include: {
          model: Permission,
        },
      });
      const roles = await Roles.findAll();
      const { permissions: permissionList } = role;
      const permissions = await permissionUser(req);
      res.render("admin/permissions/editRole", {
        title,
        moduleName,
        typeMsg,
        message,
        success,
        errors,
        user,
        role,
        roles,
        permissionList,
        permissionUtil,
        permissions,
        isPermission,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async handleEditRole(req, res) {
    try {
      const { id } = req.params;
      const { name, permission } = req.body;
      await Roles.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );
      const role = await Roles.findOne({
        where: {
          id,
        },
      });
      if (permission) {
        let dataPermission = [];
        if (typeof permission === "string") {
          dataPermission.push({
            value: permission,
          });
        } else {
          dataPermission = permission.map((item) => ({ value: item }));
        }
        dataPermission.forEach(async (item) => {
          const permissionIntance = await Permission.findOne({
            where: item,
          });
          if (!permissionIntance) {
            await role.createPermission(item);
          }
        });
        const permissonsUpdate = await Promise.all(
          dataPermission.map((item) => Permission.findOne({ where: item }))
        );

        role.setPermissions(permissonsUpdate);
      }
      req.flash("success", "Sửa role thành công!");
      res.redirect(`/admin/roles/edit/${id}`);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      //Lấy instance của role cần xóa
      const role = await Roles.findOne({ where: { id } });

      //Xóa tất cả Permission liên quan đến Role cần xóa
      await role.removePermissions(await Permission.findAll());

      //Xóa Role
      await Roles.destroy({
        where: { id },
      });
      req.flash("success", "Xóa thành công role!");
      res.redirect("/admin/users/roles");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  }
}
module.exports = new UserController();
