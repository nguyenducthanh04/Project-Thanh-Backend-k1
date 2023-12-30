const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
const flash = require("connect-flash");
const { getUrl } = require("../../../utils/getUrl");
const { validationResult } = require("express-validator");
const multer = require("multer");
const user_socials = model.user_socials;
const User = model.User;
const type = model.types;
const Courses = model.courses;
const { getError } = require("../../../utils/validate");
const { make } = require("../../../utils/hash");
const ExcelJS = require("exceljs");
class DashboardController {
  async index(req, res) {
    const user = req.user;
    res.render("admin/dashboard/index", { user, req });
  }
  async deleteSocial(req, res) {
    const provider = "google";
    user_socials.destroy({
      where: {
        provider: provider,
      },
    });
    return res.redirect("/settings");
  }
  async deleteSocialGithub(req, res) {
    const provider = "github";
    user_socials.destroy({
      where: {
        provider: provider,
      },
    });
    return res.redirect("/settings");
  }
  async changeProfile(req, res) {
    const user = req.user;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    res.render("admin/settings/changeProfile", {
      user,
      req,
      msg,
      msgType,
      success,
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
      res.redirect("/changeProfile");
      return;
    }
    return;
    // res.send('Hello')
  }
  async account(req, res) {
    const user = req.user;
    res.render("admin/account/account", { user, req });
  }
  async settingAdmin(req, res) {
    const user = req.user;
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
    });
  }
  async changePassword(req, res) {
    const user = req.user;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    res.render("admin/settings/changePass", {
      user,
      req,
      msg,
      msgType,
      success,
    });
  }
  async handleChangePass(req, res) {
    const users = req.user;
    // const email = users.email
    const salt = 10;
    const user = req.flash("user");
    const { oldpassword, password, resetpassword } = req.body;
    // console.log(req.user.password);
    console.log(users);
    // console.log(email);
    // console.log(users.password);
    // console.log(req.user.email.dataValues);
    console.log(oldpassword, password, resetpassword);
    if (password !== resetpassword) {
      req.flash("error", "Mật khẩu không khớp");
      res.redirect(`/changePass`);
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
        res.redirect("/changePass");
        return;
      }
    });
    return;
  }
  async userList(req, res) {
    const user = req.user;
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
    let pagination = [];
    if (page <= 2 || page > totalPage - 2) {
      // Hiển thị 4 trang đầu hoặc 2 trang cuối
      for (let i = 1; i <= Math.min(totalPage, 6); i++) {
        pagination.push(i);
      }
    } else {
      // Hiển thị 4 trang đầu, dấu ba chấm và 2 trang cuối
      pagination = [1, 2, 3, 4, "...", totalPage - 1, totalPage];
    }
    console.log(await User.count()); //lay tong so ban ghi
    res.render("admin/manager.user/userList", {
      userList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      pagination,
    });
  }
  async createUser(req, res) {
    const user = req.user;
    const typeUser = await type.findAll();
    console.log(`Danh sách typeUser ${typeUser}`);
    const message = req.flash("message");
    const errors = req.flash("errors");
    console.log(req.flash("message"));
    console.log(getError(errors, "name"));
    res.render("admin/manager.user/createUser", {
      typeUser,
      user,
      errors,
      message,
      getError,
    });
  }
  async handleCreateUser(req, res) {
    // console.log(createUsers);
    // console.log(`Them thanh cong!`);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body.password = make(req.body.password);
      const createUsers = await User.create(req.body);
      // console.log(`No error`);
      return res.redirect("/createUser");
    } else {
      req.flash("errors", errors.array());
      req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      console.log(errors.array());
      return res.redirect("/createUser");
    }
  }
  async editUser(req, res) {
    const user = req.user;
    const { id } = req.params;
    const userDetail = await User.findByPk(id);
    const typeList = await type.findAll();
    // console.log(userDetail);
    // console.log('name user', userDetail.name);
    res.render("admin/manager.user/editUser", { userDetail, typeList, user });
  }
  async handleEditUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    const updateUser = await User.update(userData, {
      where: {
        id: id,
      },
    });
    console.log("Cập nhật thành công");
    res.redirect(`/editUser/${id}`);
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await User.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/userList");
  }
  async teacherList(req, res) {
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
    let pagination = [];
    if (page <= 2 || page > totalPage - 2) {
      // Hiển thị 4 trang đầu hoặc 2 trang cuối
      for (let i = 1; i <= Math.min(totalPage, 6); i++) {
        pagination.push(i);
      }
    } else {
      // Hiển thị 4 trang đầu, dấu ba chấm và 2 trang cuối
      pagination = [1, 2, 3, 4, "...", totalPage - 1, totalPage];
    }
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
      pagination,
    });
  }
  async studentList(req, res) {
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
    let pagination = [];
    if (page <= 2 || page > totalPage - 2) {
      // Hiển thị 4 trang đầu hoặc 2 trang cuối
      for (let i = 1; i <= Math.min(totalPage, 6); i++) {
        pagination.push(i);
      }
    } else {
      // Hiển thị 4 trang đầu, dấu ba chấm và 2 trang cuối
      pagination = [1, 2, 3, 4, "...", totalPage - 1, totalPage];
    }

    console.log("userlist", userList);
    console.log(await User.count()); //lay tong so ban ghi
    res.render("students/home/studentList", {
      userList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      pagination,
    });
  }
  async courseList(req, res) {
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
    let pagination = [];
    if (page <= 2 || page > totalPage - 2) {
      // Hiển thị 4 trang đầu hoặc 2 trang cuối
      for (let i = 1; i <= Math.min(totalPage, 6); i++) {
        pagination.push(i);
      }
    } else {
      // Hiển thị 4 trang đầu, dấu ba chấm và 2 trang cuối
      pagination = [1, 2, 3, 4, "...", totalPage - 1, totalPage];
    }
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
    });
  }
  async editCourse(req, res) {
    const { id } = req.params;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const courseDetail = await Courses.findOne({
      include: {
        model: User,
      },
      where: {
        id: id,
      },
    });
    const teacher = courseDetail.User.name;
    console.log("Ten giao vien", teacher);
    const teacherList = await User.findAll({
      where: {
        typeId: 2,
      },
    });
    console.log(`Danh sách teacher: ${teacherList}`);
    res.render("admin/manager.course/editCourse", {
      courseDetail,
      teacher,
      teacherList,
      msg,
      msgType,
      success,
    });
  }
  async handleEditCourse(req, res) {
    const { id } = req.params;
    const courseData = req.body;
    const updateCourse = await Courses.update(courseData, {
      where: {
        id: id,
      },
    });
    console.log("Cập nhật thành công");
    req.flash("success", "Cập nhật thông tin khóa học thành công!");
    res.redirect(`/editCourse/${id}`);
  }
  async deleteCourse(req, res) {
    const { id } = req.params;
    const deleteCourse = await Courses.destroy({
      where: {
        id: id,
      },
    });
    req.flash("success", "Đã xóa thành công khóa học!");
    res.redirect("/courseList");
  }
  async createCourse(req, res) {
    const teacherList = await User.findAll({
      where: {
        typeId: 2,
      },
    });
    const message = req.flash("message");
    const errors = req.flash("errors");
    console.log(req.flash("message"));
    console.log(getError(errors, "name"));
    res.render("admin/manager.course/createCourse", {
      teacherList,
      message,
      errors,
      getError,
    });
  }
  async handleCreateCourse(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //   req.body.password = make(req.body.password);
      const createCourse = await Courses.create(req.body);
      // console.log(`No error`)
      return res.redirect("/createCourse");
    } else {
      req.flash("errors", errors.array());
      req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      console.log(errors.array());
      res.redirect("/createCourse");
    }
  }
  async exportStudent(req, res) {
    const studentList = await User.findAll({
      where: {
        typeId: 3,
      },
    });
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
  async exportAdmin(req, res) {
    const adminList = await User.findAll({
      where: {
        typeId: 1,
      },
    });
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
  async exportTeacher(req, res) {
    const teacherList = await User.findAll({
      where: {
        typeId: 2,
      },
    });
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
  async exportCourse(req, res) {
    const courseList = await Courses.findAll({
      include: User,
    });

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
  async deleteAll(req, res) {
    const { listUserDelete } = req.body;
    const listArr = listUserDelete.split(",");
    await Courses.destroy({
      where: {
        id: {
          [Op.in]: listArr,
        },
      },
    });
    res.redirect("/courseList");
  }
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
    res.redirect("/studentList");
  }
  importExcelUser(req, res) {
    return res.render("admin/importExcel");
  }
  // async handleImportExcelUser(req, res) {
  //   const storage = multer.diskStorage({
  //     destination: "uploads/",
  //     filename: (req, file, cb) => {
  //       cb(null, Date.now() + path.extname(file.originalname));
  //     },
  //   });
  //   const upload = multer({ storage });
  //   try {
  //     const workbook = new ExcelJS.Workbook();
  //     await workbook.xlsx.readFile(req.file.path);
  //     const worksheet = workbook.getWorksheet(1);

  //     await Courses.sync({ force: true });

  //     worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
  //       const data = row.values;
  //       await Courses.create({
  //         id: data[1],
  //         name: data[2],
  //         price: data[3],
  //         teacherId: data[4],
  //         // tryLearn: data[5],
  //         quantity: data[6],
  //         duration: data[7],

  //         // Các cột khác tương ứng với tệp Excel
  //       });
  //     });

  //     return res.send("Import thành công!");
  //   } catch (error) {
  //     console.error("Error importing Excel data: " + error.message);
  //     return res.status(500).send("Đã xảy ra lỗi");
  //   }
  //   return res.send("Ok");
  // }
}
module.exports = new DashboardController();
