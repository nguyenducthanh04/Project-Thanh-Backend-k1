const { login_tokens } = require("../../models/index");
module.exports = async (req, res, next) => {
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
};
