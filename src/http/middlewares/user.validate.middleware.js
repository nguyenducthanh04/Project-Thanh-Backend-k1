const { query } = require('express-validator');

module.exports = () => {
   return [
    query('name', 'Tên bắt buộc phải nhập').notEmpty(),
    query('email', 'Email bắt buộc phải nhập').notEmpty(),
    query('email', 'Email không đúng định dạng').isEmail(),
    query('password', 'Mật khẩu bắt buộc phải nhập').notEmpty(),
    query('password', 'Mật khẩu không đủ mạnh').isStrongPassword({
        minLength: 6,
        minUpperCase: 1,
        minNumbers: 1,
    }),


   ]
} 