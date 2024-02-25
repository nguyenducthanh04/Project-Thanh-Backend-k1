const model = require("../../models/index");
const types = model.types;
module.exports = {
  getAllType: async () => {
    try {
      return await types.findAll();
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
};
