const model = require("../../models/index");
const Courses = model.courses;
const User = model.User;
module.exports = {
  getAllCourses: async () => {
    try {
      return await Courses.findAll({
        include: {
          model: User,
        },
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getCourseById: async (id) => {
    try {
      return await Courses.findOne({
        include: {
          model: User,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
};
