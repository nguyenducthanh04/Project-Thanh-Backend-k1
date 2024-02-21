const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");
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
    });
  }
  //Quản lý học viên
  async studentList(req, res) {
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
  }
  //Quản lý giáo viên
  async teacherList(req, res) {
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
    //Tính offset
    const offset = (page - 1) * PER_PAGE;
    const userList = await User.findAll({
      where: filters,

      limit: +PER_PAGE,
      offset: offset,
    });
    const permissions = await permissionUser(req);
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
      isPermission,
      permissions,
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
      permissions,
      isPermission,
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
  async importExcelUser(req, res) {
    const title = "";
    const permissions = await permissionUser(req);
    return res.render("admin/importExcelUser", {
      moduleName,
      title,
      permissions,
      isPermission,
    });
  }
  async teacherDetail(req, res) {
    const title = "";
    const { id } = req.params;
    const teacherLists = await User.findOne({
      where: {
        typeId: 2,
        id: id,
      },
    });
    const classTeacher = await User.findByPk(id, {
      include: {
        model: Classes,
      },
    });
    const classTeacherList = classTeacher.classes;
    console.log("0810:", classTeacherList);
    const b = classTeacherList.forEach((item) => {
      console.log("b", item);
    });
    const permissions = await permissionUser(req);
    res.render("admin/teacher/index", {
      title,
      moduleName,
      teacherLists,
      classTeacherList,
      permissions,
      isPermission,
    });
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
    const title = "";
    const { id } = req.params;
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
      calendarArray,
      permissions,
      isPermission,
    });
  }
  async studentDetail(req, res) {
    const title = "";
    const { id } = req.params;
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
    console.log("studentClass:", studentClass);
    const permissions = await permissionUser(req);
    // let studentClassList = studentClass.class;
    // if (typeof studentClassList === "object") {
    //   studentClassList = [studentClassList];
    // }
    // console.log("haha", studentClassList);
    res.render("admin/student/index", {
      studentLists,
      title,
      moduleName,
      studentClass,
      permissions,
      isPermission,
    });
  }
  async studentAttendance(req, res) {
    const title = "";
    const { id } = req.params;
    const classDate = await Classes.findByPk(id);

    const startDate = classDate.startDate;
    const endDate = classDate.endDate;

    const numberOfWeeks = differenceInWeeks(endDate, startDate);

    console.log("Số tuần trong khoảng thời gian là:", numberOfWeeks);
    const permissions = await permissionUser(req);
    res.render("admin/student/attendance", {
      title,
      moduleName,
      permissions,
      isPermission,
    });
  }
  async permission(req, res) {
    const title = "";
    const { id } = req.params;
    const roleList = await Roles.findAll();
    const user = await User.findOne({
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
      user,
      isRole,
      isPermission,
      permissions,
    });
  }
  async handlePermission(req, res) {
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
    res.redirect(`/admin/users/permission/${id}`);
  }
  async roles(req, res) {
    const title = "";
    const roleList = await Roles.findAll();
    const permissions = await permissionUser(req);
    res.render("admin/permissions/roles", {
      title,
      moduleName,
      roleList,
      permissions,
      isPermission,
    });
  }
  async addRole(req, res) {
    const title = "";
    const permissions = await permissionUser(req);
    res.render("admin/permissions/addRole", {
      title,
      moduleName,
      permissions,
      isPermission,
    });
  }
  async handleAddRole(req, res) {
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
    res.redirect("/admin/users/roles");
  }
  async editRole(req, res) {
    const title = "";
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
      role,
      roles,
      permissionList,
      permissionUtil,
      permissions,
      isPermission,
    });
  }
  async handleEditRole(req, res) {
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
    res.redirect(`/admin/roles/edit/${id}`);
  }
  async deleteRole(req, res) {
    const { id } = req.params;
    //Lấy instance của role cần xóa
    const role = await Roles.findOne({ where: { id } });

    //Xóa tất cả Permission liên quan đến Role cần xóa
    await role.removePermissions(await Permission.findAll());

    //Xóa Role
    await Roles.destroy({
      where: { id },
    });

    res.redirect("/admin/users/roles");
  }
}
module.exports = new UserController();
