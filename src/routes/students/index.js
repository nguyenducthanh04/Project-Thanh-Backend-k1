var express = require("express");
var router = express.Router();
const StudentController = require("../../http/controllers/students/student.controller");
/* GET home page. */
router.get("/", StudentController.index);

module.exports = router;
