// const model = require("../../../models/index");
class StudentController {
  async index(req, res) {
    const user = req.user;
    res.render("students/home/index", {user, req});
  }
  changePass (req, res) {
    const user = req.user;
  res.render('students/settings/changePass', {user, req})
  }
}
module.exports = new StudentController();
