module.exports = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect("/auth/login");
    }
    next();
  } catch (error) {
    res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
  }
};
