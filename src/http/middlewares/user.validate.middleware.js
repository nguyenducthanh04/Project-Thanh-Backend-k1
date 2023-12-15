const { check } = require('express-validator');
const model = require('../../models/index');
const User = model.User;
module.exports = () => {
   return [
    check('name', 'Tên bắt buộc phải nhập').notEmpty(),
    check('name', 'Tên không quá 100 kí tự').isLength({ max: 50}),
    check('email', 'Email bắt buộc phải nhập').notEmpty(),
    check('email', 'Email không đúng định dạng').isEmail(),
    check('password', 'Mật khẩu bắt buộc phải nhập').notEmpty(),
    check('password', 'Mật khẩu không đủ mạnh').isStrongPassword({
        minLength: 6,  //6 kí tự
        minUpperCase: 1, //1 chữ hoa
        minNumbers: 1, //1 số
    }),
    check('email').custom(async (email) => {
        const userEmail = await User.findOne({
            where: {
            email: email
            }
        })
        if(userEmail) {
            throw new Error('Email đã có người sử dụng')
        }
    })

   ]
} 