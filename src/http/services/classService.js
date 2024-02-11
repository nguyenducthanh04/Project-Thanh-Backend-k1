const model = require("../../models/index");
const Classes = model.classes;
const courses = model.courses;
module.exports = {
  getAllClass: async () => {
    return await Classes.findAll();
  },
  getClassByPk: async (id) => {
    return await Classes.findOne({
      include: {
        model: courses,
      },
      where: {
        id: id,
      },
    });
  },
};
