const model = require("../../models/index");
const Courses = model.courses;
const User = model.User;
module.exports = {
  getAllCourses: async () => {
    return await Courses.findAll({
      include: {
        model: User,
      },
    });
  },
  getCourseById: async (id) => {
    return await Courses.findOne({
      include: {
        model: User,
      },
      where: {
        id: id,
      },
    });
  },
};
