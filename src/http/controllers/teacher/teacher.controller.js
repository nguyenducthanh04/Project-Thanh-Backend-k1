// const model = require("../../../models/index");
class TeacherController {
  async index(req, res) {
    const user = req.user;
    res.render("teachers/home/index", {user});
  }
}
module.exports = new TeacherController();
