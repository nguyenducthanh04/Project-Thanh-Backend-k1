const model = require("../../models/index");
const User = model.User;
module.exports = {
  getAllUsers: async () => {
    return await User.findAll();
  },
  getUserByPk: async (id) => {
    return await User.findByPk(id);
  },
  getAllAdmin: async () => {
    return await User.findAll({
      where: {
        typeId: 1,
      },
    });
  },
  getAllTeacher: async () => {
    return await User.findAll({
      where: {
        typeId: 2,
      },
    });
  },
  getAllStudent: async () => {
    return await User.findAll({
      where: {
        typeId: 3,
      },
    });
  },
};
