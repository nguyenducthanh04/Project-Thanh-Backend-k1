const model = require("../../models/index");
const Classes = model.classes;
const courses = model.courses;
module.exports = {
  getAllClass: async () => {
    try {
      return await Classes.findAll();
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getClassByPk: async (id) => {
    try {
      return await Classes.findOne({
        include: {
          model: courses,
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
