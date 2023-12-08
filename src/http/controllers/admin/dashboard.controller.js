// const model = require("../../../models/index");
const model = require('../../../models/index');
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const user_socials = model.user_socials;
const User = model.User
class DashboardController {
  async index(req, res) {
    const user = req.user;
    res.render("admin/dashboard/index", {user});
  }
  async deleteSocial (req, res) {
    const provider = 'google'
     user_socials.destroy({
      where: {
        provider: provider,
      }
    })
    return res.redirect('/')
  }
  async deleteSocialGithub (req, res) {
    const provider = 'github'
     user_socials.destroy({
      where: {
        provider: provider,
      }
    })
    return res.redirect('/')
  }
  async changeProfile (req, res) {
    const user = req.user;
    res.render('admin/settings/changeProfile', { user })
  }
  async handleChangeProfile (req, res) {
    const user = req.user;
    const { name, email, address, phone } = req.body;
    // console.log(name, email, address, phone)
    const value = await User.update({
          name: name,
          email: email,
          address: address,
          phone: phone,
        },
        {
          where: {
            id: req.user.id,
          },
        }
        );
        if (value) {
          console.log('Update thanh cong');
          req.flash("msg", "Thay đổi tên thành công!");
          res.redirect("/changeProfile");
          return;
        }
        return;
    // res.send('Hello')
  }
  async account (req, res) {
    const user = req.user;
    res.render('admin/account/account', {user})
  }
  async settingAdmin (req, res) {
    const user = req.user;
    const userSocials = await user_socials.findAll({
      where: {
        userId: req.user.id,
      }
    })
    console.log(userSocials);
    const socials = userSocials.map((social) => social.dataValues.provider)
    console.log(socials);
    res.render('admin/settings/index', {socials, user})
  }
  async changePassword (req, res)  {
    const user = req.user
   res.render("admin/settings/changePass", {user});
  }
  async handleChangePass (req, res) {
    const users = req.user;
    // const email = users.email
    const salt = 10;
    const user = req.flash("user");
    const {oldpassword, password, resetpassword} = req.body;
    // console.log(req.user.password);
    console.log(users);
    // console.log(email);
    console.log(users.password);
    // console.log(req.user.email.dataValues);
    console.log(oldpassword, password, resetpassword);
    if (password !== resetpassword) {
      req.flash("error", "Mật khẩu không khớp");
      res.redirect(`/changePass`);
      return;
    }
    bcrypt.hash(password, salt, async function (err, hash) {
      const value = await User.update(
        { password: hash },
        {
          where: {
            email: users.email,
          },
        }
      );
      if (value) {
        console.log('Update thanh cong');
        req.flash("msg", "Cập nhập mật khẩu thành công!");
        res.redirect("/");
        return;
      }
    });
    return;
  }
  async userList (req, res) {
    const user = req.user;
    const {keyword, typeId} = req.query;
    // console.log(keyword, typeId);
    const filters = {};
    if(typeId === 'teacher' || typeId === 'student' || typeId === 'admin') {
      // filters.typeId = typeId === 'teacher' ? 2 : 3;
      if(typeId === 'admin') {
        filters.typeId = 1;
      } else if(typeId === 'teacher') {
        filters.typeId = 2;
      } else {
        filters.typeId = 3;
      }
    }
    if(keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like] : `%${keyword}%`
          }
        },
        {
          email: {
            [Op.like] : `%${keyword}%`
          }
        }
      ]
      // filters.name = {
      //   [Op.like] : `%${keyword}%`
      // }
    }
    console.log(filters);
    const userList = await User.findAll({
      // where: {
      //   typeId: {
      //     [Op.or]: [2, 3]
      //   }
      // }
      where: filters
    });
    // console.log(userList);
    res.render('admin/manager.user/userList', {userList, user})
  } 
}
module.exports = new DashboardController();
