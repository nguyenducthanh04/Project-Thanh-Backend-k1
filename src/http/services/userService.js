const model = require("../../models/index");
const User = model.User;
module.exports = {
  getAllUsers: async () => {
    try {
      return await User.findAll();
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getUserByPk: async (id) => {
    try {
      return await User.findByPk(id);
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getAllAdmin: async () => {
    try {
      return await User.findAll({
        where: {
          typeId: 1,
        },
      });
    } catch {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getAllTeacher: async () => {
    try {
      return await User.findAll({
        where: {
          typeId: 2,
        },
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  getAllStudent: async () => {
    try {
      return await User.findAll({
        where: {
          typeId: 3,
        },
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
};
