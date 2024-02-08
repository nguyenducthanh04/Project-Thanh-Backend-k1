const model = require("../../../models/index");
const User = model.User;
const Classes = model.classes;
const Schedule = model.scheduleclasses;
const moment = require("moment");
const { isPermission } = require("../../../utils/permission");
const permissionUser = require("../../../utils/permissionUser");
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
}
module.exports = new TeacherController();
