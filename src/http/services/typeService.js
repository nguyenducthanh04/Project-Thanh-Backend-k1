const model = require("../../models/index");
const types = model.types;
module.exports = {
  getAllType: async () => {
    return await types.findAll();
  },
};
