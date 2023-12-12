const {login_tokens} = require('../models/index')
const md5 = require("md5");
module.exports = async (id) => {
  const loginToken = await login_tokens.findOne({
    where: {
      userId: id,
    },
  });
  const cookie = md5(Math.random());
  if (!loginToken) {
    await login_tokens.create({
      userId: id,
      token: cookie,
    });
  } else {
    await login_tokens.destroy({
      where: {
        userId: id,
      },
    });
    await login_tokens.create({
      userId: id,
      token: cookie,
    });
  }
  return cookie;
};