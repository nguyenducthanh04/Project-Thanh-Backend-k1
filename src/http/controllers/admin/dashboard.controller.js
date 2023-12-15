const model = require('../../../models/index');
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { PER_PAGE } = process.env;
const flash = require('connect-flash');
const { getUrl } = require('../../../utils/getUrl')
const { validationResult } = require('express-validator');
const user_socials = model.user_socials;
const User = model.User
const type = model.types;
const Courses = model.courses;
const {getError} = require('../../../utils/validate')
const {make} = require('../../../utils/hash')
class DashboardController {
  async index(req, res) {
    const user = req.user;
    res.render("admin/dashboard/index", {user, req});
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
    const msg = req.flash('error')
    const msgType = msg ? 'danger' : 'success';
    const success = req.flash('success')
    res.render('admin/settings/changeProfile', { user, req, msg, msgType, success })
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
          req.flash("success", "Thay đổi thông tin thành công!");
          res.redirect("/changeProfile");
          return;
        }
        return;
    // res.send('Hello')
  }
  async account (req, res) {
    const user = req.user;
    res.render('admin/account/account', {user, req})
  }
  async settingAdmin (req, res) {
    const user = req.user;
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
    const userSocials = await user_socials.findAll({
      where: {
        userId: req.user.id,
      }
    })
    console.log(userSocials);
    const socials = userSocials.map((social) => social.dataValues.provider)
    console.log(socials);
    res.render('admin/settings/index', {socials, user, req, msg, msgType, success})
  }
  async changePassword (req, res)  {
    const user = req.user
    const msg = req.flash("error");
    const msgType = msg ? "danger" : "success";
    const success = req.flash("success");
   res.render("admin/settings/changePass", {user, req, msg, msgType, success});
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
    // console.log(users.password);
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
        req.flash("success", "Cập nhập mật khẩu thành công!");
        res.redirect("/changePass");
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
    filters.typeId = 1;
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
    const totalCountObj = await User.findAndCountAll({
      where: filters
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang 
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let {page} = req.query;
    if(!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page -1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      // where: {
      //   typeId: {
      //     [Op.or]: [2, 3]
      //   }
      // }
      where: 
      filters,
      
      limit: +PER_PAGE,
      offset: offset,
    });
    console.log(await User.count()); //lay tong so ban ghi
    res.render('admin/manager.user/userList', {userList, user, req, totalPage, getUrl, page})
  } 
  async createUser (req, res) {
    const user = req.user;
    const typeUser = await type.findAll()
    // console.log(typeUser);
    const message = req.flash('message');
    const errors = req.flash('errors');
    console.log(req.flash('message'));
    console.log(getError(errors, "name"));
    res.render('admin/manager.user/createUser', {typeUser, user, errors, message, getError})
  }
  async handleCreateUser (req, res) {
    // console.log(createUsers);
    // console.log(`Them thanh cong!`);
    const errors = validationResult(req);
    if(errors.isEmpty()) {
      req.body.password = make(req.body.password);
    const createUsers = await User.create(req.body);
    // console.log(`No error`);
    return res.redirect('/createUser')
    } else {
      req.flash('errors', errors.array());
      req.flash('message', 'Vui lòng nhập đầy đủ thông tin !')
      console.log(errors.array());
     return res.redirect('/createUser')
    }
  }
  async editUser (req, res) {
    const user = req.user;
    const { id } = req.params;
    const userDetail = await User.findByPk(id);
    const typeList = await type.findAll();
    // console.log(userDetail);
    // console.log('name user', userDetail.name);
    res.render('admin/manager.user/editUser', {userDetail, typeList, user})
  } 
  async handleEditUser (req, res) {
    const { id } = req.params;
    const userData = req.body;
    const updateUser = await User.update(userData, {
      where: {
        id: id,
      }
    })
    console.log('Cập nhật thành công');
    res.redirect(`/editUser/${id}`)
  }
  async deleteUser (req, res) {
    const { id } = req.params;
    const deleteUser = await User.destroy({
      where: {
        id: id,
      }
    })
    res.redirect('/userList')
  }
  async teacherList (req, res) {
    const user = req.user;
    const {keyword, typeId} = req.query;
    console.log('login keyword',keyword, typeId);
    const filters = {};
    filters.typeId = 2;
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
    console.log(filters.name);
    console.log(filters.email);
    const totalCountObj = await User.findAndCountAll({
      where: filters
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang 
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let {page} = req.query;
    if(!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page -1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      where:  filters,
      
      limit: +PER_PAGE,
      offset: offset,
    });
    console.log('userlist', userList);
    console.log(await User.count()); //lay tong so ban ghi
    console.log(`Tổng số trang: ${totalPage}`);
    res.render('teachers/home/teacherList', {userList, user, req, totalPage, getUrl, page})
  }
  async studentList (req, res) {
    const user = req.user;
    const {keyword, typeId} = req.query;
    console.log('login keyword',keyword, typeId);
    const filters = {};
    filters.typeId = 3;
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
    console.log(filters.name);
    console.log(filters.email);
    const totalCountObj = await User.findAndCountAll({
      where: filters
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    //Tính tổng số trang 
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(totalPage);
    //Lấy trang hiện tại
    let {page} = req.query;
    if(!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page -1) * PER_PAGE;
    console.log(offset);
    const userList = await User.findAll({
      // where: {
      //   typeId: {
      //     [Op.or]: [2, 3]
      //   }
      // }
      where:  filters,
      
      limit: +PER_PAGE,
      offset: offset,
    });
    console.log('userlist', userList);
    console.log(await User.count()); //lay tong so ban ghi
    res.render('students/home/studentList', {userList, user, req, totalPage, getUrl, page})
  }
  async courseList(req, res) {
    // const courseList = await Courses.findAll();
    const user = req.user
    const { keyword } = req.query;
    console.log(keyword);
    const filters = {};
    if(keyword?.length) {
      filters[Op.or] = [
        {
          name: {
            [Op.like] : `%${keyword}%`
          }
        },
        {
          "$User.name$": {
            [Op.like] : `%${keyword}%`
          }
        }
      ]
      // filters.name = {
      //   [Op.like] : `%${keyword}%`
      // }
    }
    const totalCountObj = await Courses.findAndCountAll({
      where: filters
    }); //Lấy tổng số bản ghi
    const totalCount = totalCountObj.count;
    console.log(`totalCount ${totalCount}`);
    //Tính tổng số trang 
    const totalPage = Math.ceil(totalCount / PER_PAGE);
    console.log(`totalPage ${totalPage}`);

    //Lấy trang hiện tại
    let {page} = req.query;
    if(!page || page < 1 || page > totalPage) {
      page = 1;
    }
    console.log(page);
    //Tính offset
    const offset = (page -1) * PER_PAGE;
    console.log(offset);
    const courseList = await Courses.findAll({ include: {
      model: User
    }, 
    where: filters,
    limit: +PER_PAGE,
    offset: offset,
  })
    res.render("admin/manager.course/courseList", {courseList, user, req, totalPage, getUrl, page})
  }
}
module.exports = new DashboardController();
