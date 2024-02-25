module.exports = async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.typeId === 1) {
        return res.redirect("/admin");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      } else {
        return res.redirect("/student");
      }
    }
    next();
  } catch (error) {
    res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
  }
};
