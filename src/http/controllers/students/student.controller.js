// const model = require("../../../models/index");
class StudentController {
  async index(req, res) {
    const user = req.user;
    res.render("students/home/index", {user});
  }
  changePass (req, res) {
    const user = req.user;
  res.render('students/settings/changePass', {user})
  }
}
module.exports = new StudentController();
