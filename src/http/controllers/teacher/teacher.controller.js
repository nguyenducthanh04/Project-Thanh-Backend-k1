// const model = require("../../../models/index");
const moduleName = "";
class TeacherController {
  async index(req, res) {
    const user = req.user;
    const title = "";
    res.render("teachers/home/index", { user, req, title, moduleName });
  }
}
module.exports = new TeacherController();
