const { check } = require("express-validator");
const model = require("../../models/index");
const Classes = model.classes;
const Schedule = model.scheduleclasses;
module.exports = (req, res, next) => {
  try {
    const scheduleBody = req.body.schedule;
    const scheduleSet = new Set(scheduleBody);

    if (scheduleSet.size !== scheduleBody.length) {
      // Các giá trị bị trùng nhau
      req.flash("error", "Ngày không được trùng lặp");
      return res.redirect(req.originalUrl);
    }
    return next();
  } catch (error) {
    res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
  }
};
