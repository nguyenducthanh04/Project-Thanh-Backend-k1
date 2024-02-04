const model = require("../../../models/index");
const bcrypt = require("bcrypt");
const { Op, where } = require("sequelize");
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
const Schedule = model.scheduleclasses;
const StudentClass = model.students_classes;
const Excersise = model.exercises;
const TeacherCalendar = model.teacher_calendar;
const Comments = model.comments;
const { getError } = require("../../../utils/validate");
const { make } = require("../../../utils/hash");
const ExcelJS = require("exceljs");
const userService = require("../../../http/services/userService");
const typeService = require("../../services/typeService");
const courseService = require("../../services/courseService");
const classService = require("../../services/classService");
const { Console } = require("console");
const moduleName = "Lớp học";

class ClassController {
  async classList(req, res) {
    const title = "Danh sách lớp học";
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
          "$course.name$": {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }
    const totalCountObj = await Classes.findAndCountAll({
      include: {
        model: Courses,
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
    const classList = await Classes.findAll({
      include: {
        model: Courses,
      },
      where: filters,
      limit: +PER_PAGE,
      offset: offset,
    });
    const schedules = await Schedule.findAll({
      include: {
        model: Classes,
      },
    });
    let uniqueSchedules = [...new Set(schedules.map(JSON.stringify))].map(
      JSON.parse
    );
    // console.log("classList:", classList);
    // console.log("schedule list: ", schedules);
    // console.log("schedule list new set: ", uniqueSchedules);
    res.render("admin/manager.class/classList", {
      classList,
      req,
      moment,
      schedules,
      moduleName,
      title,
    });
  }
  //Create Class
  async createClass(req, res) {
    const user = req.user;
    const title = "Thêm mới lớp học";
    const courseList = await courseService.getAllCourses();
    const message = req.flash("message");
    const success = req.flash("success");
    const errors = req.flash("errors");
    const Day = new Date();
    console.log("Day", Day);
    res.render("admin/manager.class/createClass", {
      courseList,
      user,
      getError,
      message,
      errors,
      success,
      title,
      moduleName,
    });
  }
  async handleCreateClass(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, quantity, startDate, endDate, courseId } = req.body;
      const { schedule, startTime, endTime } = req.body;
      const course = await Courses.findByPk(courseId);
      const teacher = await User.findByPk(course.teacherId);
      const Class = await Classes.create({
        name: name,
        quantity: quantity,
        startDate: startDate,
        endDate: endDate,
        courseId: courseId,
      });
      await Class.addUser(teacher);
      await TeacherCalendar.create({
        teacherId: teacher.id,
        classId: Class.id,
        scheduleDate: null,
      });
      if (schedule.length === 1) {
        await Schedule.create({
          schedule: schedule,
          timeLearn: `${startTime}-${endTime}`,
          classId: Class.id,
        });
        req.flash("success", "Thêm lớp học thành công!");
        return res.redirect("/admin/createClass");
      } else {
        for (let i = 0; i < schedule.length; i++) {
          await Schedule.create({
            schedule: schedule[i],
            timeLearn: `${startTime[i]}-${endTime[i]}`,
            classId: Class.id,
          });
        }
        req.flash("success", "Thêm lớp học thành công!");
        return res.redirect("/admin/classList");
      }
    } else {
      req.flash("errors", errors.array());
      req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      return res.redirect("/admin/createClass");
    }
  }
  async editClass(req, res) {
    const title = "";
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const { id } = req.params;
    const message = req.flash("message");
    const errors = req.flash("errors");
    // const classId = req.params.classId;
    const classDetail = await classService.getClassByPk(id);
    console.log("ClassDetail: ", classDetail);
    const course = classDetail.course.name;
    const courseList = await courseService.getAllCourses();
    console.log("Course: ", course);
    // const scheduleList = await Schedule.findAll();
    const scheduleInfo = await Schedule.findAll({
      where: { classId: id },
    });

    res.render("admin/manager.class/editClass", {
      classDetail,
      courseList,
      course,
      moment,
      msg,
      msgType,
      success,
      errors,
      message,
      scheduleInfo,
      getError,
      moduleName,
      title,
    });
  }
  async handleEditClass(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const classData = req.body;
      const { name, quantity, startDate, endDate, courseId } = req.body;
      const { schedule, startTime, endTime } = req.body;
      await Classes.update(
        {
          name: name,
          quantity: quantity,
          startDate: startDate,
          endDate: endDate,
          courseId: courseId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const course = await Courses.findByPk(courseId, {
        include: {
          model: User,
        },
      });
      console.log("hi", course.User.id);
      await TeacherCalendar.update(
        {
          teacherId: course.User.id,
          classId: id,
          scheduleDate: null,
        },
        {
          where: {
            classId: id,
          },
        }
      );
      await Schedule.destroy({
        where: {
          classId: id,
        },
      });
      if (schedule.length === 1) {
        await Schedule.create({
          schedule: schedule,
          timeLearn: `${startTime}-${endTime}`,
          classId: id,
        });
      } else {
        // await Schedule.destroy({
        //   where: {
        //     classId: id,
        //   },
        // });

        for (let i = 0; i < schedule.length; i++) {
          await Schedule.create({
            schedule: schedule[i],
            timeLearn: `${startTime[i]}-${endTime[i]}`,
            classId: id,
          });
        }
      }
      console.log("Cập nhật thành công");
      req.flash("success", "Cập nhật thông tin lớp học thành công!");
      res.redirect(`/admin/editClass/${id}`);
    } else {
      req.flash("errors", errors.array());
      // req.flash("message", "Vui lòng nhập đầy đủ thông tin !");
      console.log(errors.array());
      return res.redirect(`/admin/editClass/${id}`);
    }
  }
  //Delete Class
  async deleteClass(req, res) {
    const { id } = req.params;
    await Classes.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/admin/classList");
  }
  //Delete All Class
  async deleteAllClass(req, res) {
    const { listUserDelete } = req.body;
    const listArr = listUserDelete.split(",");
    await Classes.destroy({
      where: {
        id: {
          [Op.in]: listArr,
        },
      },
    });
    res.redirect("/admin/classList");
  }
  async exportClass(req, res) {
    const classList = await Classes.findAll({
      include: {
        model: Schedule,
      },
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");
    worksheet.columns = [
      { header: "id", key: "id", width: 10 },
      { header: "Tên", key: "name", width: 30 },
      { header: "Số lượng", key: "quantity", width: 40 },
      { header: "Ngày khai giảng", key: "startDate", width: 30 },
      { header: "Ngày bế giảng", key: "endDate", width: 30 },
      { header: "Lịch học", key: "Schedule.schedule", width: 30 },
      { header: "Khóa học", key: "courseId", width: 30 },
      { header: "Thời gian học", key: "Schedule.timeLearn", width: 30 },
    ];
    classList.forEach((classItem) => {
      worksheet.addRow({
        id: classItem.id,
        name: classItem.name,
        quantity: classItem.quantity,
        startDate: classItem.startDate,
        endDate: classItem.endDate,
        "Schedule.schedule": classItem.Schedule.schedule,
        "Schedule.timeLearn": classItem.Schedule.timeLearn,
      });
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
  importExcelClass(req, res) {
    const title = "";
    return res.render("admin/importExcelClass", { moduleName, title });
  }
  async classDetails(req, res) {
    const title = "";
    const { id } = req.params;
    console.log("id:", id);
    const classList = await classService.getClassByPk(id);
    const courseList = await courseService.getCourseById(classList.course.id);
    console.log("ten gv: ", courseList.User.name);
    const scheduleList = await Schedule.findAll({
      where: {
        classId: id,
      },
    });
    console.log("ok:", classList);
    // console.log("hihi: ", scheduleList);
    res.render("classes/index", {
      classList,
      scheduleList,
      moduleName,
      title,
      courseList,
      moment,
    });
  }

  async createStudentClass(req, res) {
    const title = "";
    const { id } = req.params;
    const user = req.user;
    const { keyword, typeId } = req.query;
    const classItem = await Classes.findByPk(id, {
      include: {
        model: StudentClass,
      },
    });
    const studentIds = [];
    // console.log("081024", classItem);
    classItem.students_classes.forEach((studentClass) => {
      console.log("081024", studentClass);
      studentIds.push(studentClass.studentId);
    });
    console.log("studentId:", studentIds);
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
    res.render("classes/createStudent", {
      userList,
      user,
      req,
      totalPage,
      getUrl,
      page,
      moduleName,
      title,
      studentIds,
    });
  }
  async handleCreateStudentClass(req, res) {
    const classId = req.params.id;
    let { studentId } = req.body;
    const statusId = 1;
    await StudentClass.destroy({
      where: {
        id: classId,
      },
    });
    console.log("studentId", studentId);
    console.log("studentId2", typeof studentId);
    if (typeof studentId === "string") {
      studentId = [studentId];
    }
    console.log("length", studentId.length);

    if (studentId.length === 1) {
      await StudentClass.create({
        studentId: studentId,
        classId: classId,
        statusId: statusId,
        completedDate: null,
        dropDate: null,
        recover: null,
      });
    } else {
      for (let i = 0; i < studentId.length; i++) {
        console.log("studentId3", Number(studentId[i]));
        await StudentClass.create({
          studentId: studentId[i],
          classId: classId,
          statusId: statusId,
          completedDate: null,
          dropDate: null,
          recover: null,
        });
      }
    }
    await Classes.update(
      { quantity: studentId.length },
      {
        where: {
          id: classId,
        },
      }
    );
    res.send("ok");
  }
  async excersiseClass(req, res) {
    const title = "";
    const { id } = req.params;
    let excersiseList = await Excersise.findAll({
      where: {
        classId: id,
      },
    });
    console.log("excersise: ", excersiseList);
    res.render("classes/excersise", { title, moduleName, excersiseList, id });
  }
  async excersiseClassDetail(req, res) {
    const title = "";
    const { id } = req.params;
    let excersiseList = await Excersise.findAll({
      where: {
        id: id,
      },
    });
    console.log("excersise: ", excersiseList);
    res.render("classes/excersiseDetail", { title, moduleName, excersiseList });
  }
  async handleCommentExcersise(req, res) {
    const { id } = req.params;
    const classExcersise = await Excersise.findByPk(id);
    console.log("ok", classExcersise.classId);
    res.send("Ok");
  }
  async createExcersise(req, res) {
    const title = "";
    res.render("classes/createExcersise", { title, moduleName });
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
    res.redirect(`/admin/class/CreateExcersise/${classId}`);
  }
}
module.exports = new ClassController();
