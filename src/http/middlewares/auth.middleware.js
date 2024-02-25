const { login_tokens } = require("../../models/index");
module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/auth/login");
    } else {
      const loginToken = await login_tokens.findOne({
        where: {
          userId: req.user.id,
        },
      });
      if (req.cookies.loginToken === loginToken.token) {
        next();
      } else {
        req.logout((err) => {
          if (err) {
            next();
          }
        });
        res.clearCookie("loginToken");
        res.redirect("/auth/login");
        //   return;
      }
    }
  } catch (error) {
    res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
  }
};
