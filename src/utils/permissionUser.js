const model = require("../models/index");
const User = model.User;
const Roles = model.roles;
const Permission = model.permissions;

module.exports = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: { id },
      include: {
        model: Roles,
      },
    });
    console.log("user", user);
    const roles = user.roles;
    console.log("roles", roles);
    // Lấy tất cả permission của từng Role
    let permissions = await Promise.all(
      roles.map(async ({ id }) => {
        const role = await Roles.findOne({
          where: {
            id,
          },
          include: {
            model: Permission,
          },
        });
        console.log("role:", role);
        return role.permissions;
      })
    );
    console.log("permissions:", permissions);
    permissions = permissions.map((item) => {
      return item.map(({ value }) => value);
    });
    permissions = [...new Set(permissions.flat(Infinity))];
    return permissions;
  } catch (error) {
    console.log("Có lỗi xảy ra:");
    // res.redirect(`/admin`);
  }
};
