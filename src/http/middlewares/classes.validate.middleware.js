const { check } = require("express-validator");
const model = require("../../models/index");
const Classes = model.classes;
const Schedule = model.scheduleclasses;
module.exports = () => {
  return [
    check("name", "Tên lớp học bắt buộc phải nhập").notEmpty(),
    check("quantity", "Sĩ số bắt buộc phải nhập").notEmpty(),
    check("name", "Tên lớp học không quá 100 kí tự").isLength({ max: 100 }),
    // check("schedule", "Lịch học bắt buộc phải nhập").notEmpty(),
    // check('email', 'Email không đúng định dạng').isEmail(),
    check("courseId", "Tên khóa học bắt buộc phải chọn").notEmpty(),
    // check("timeLearn", "Thời gian học bắt buộc phải nhập").notEmpty(),
    check("name").custom(async (name) => {
      const className = await Classes.findOne({
        where: {
          name: name,
        },
      });
      if (className) {
        throw new Error("Tên lớp đã được sử dụng");
      }
    }),
    // check("schedule").custom(async (schedule) => {
    //   const scheduleName = await Schedule.findOne({
    //     where: {
    //       schedule: schedule,
    //     },
    //   });
    //   if (scheduleName) {
    //     throw new Error("Ngày không được trùng lặp");
    //   }
    // }),
  ];
};
