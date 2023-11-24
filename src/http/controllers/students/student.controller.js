// const model = require("../../../models/index");
class StudentController {
  async index(req, res) {
    res.render("students/home/index");
  }
}
module.exports = new StudentController();
