// const model = require("../../../models/index");
const moduleName = "";
class StudentController {
  async index(req, res) {
    const title = "";
    const user = req.user;
    res.render("students/home/index", { user, req, moduleName, title });
  }
  changePass(req, res) {
    const user = req.user;
    res.render("students/settings/changePass", {
      user,
      req,
      title,
      moduleName,
    });
  }
}
module.exports = new StudentController();
