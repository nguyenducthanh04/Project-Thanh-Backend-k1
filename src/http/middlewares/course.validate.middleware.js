const { check } = require('express-validator');
const model = require('../../models/index');
const Courses = model.Courses;
module.exports = () => {
   return [
    check('name', 'Tên khoá học bắt buộc phải nhập').notEmpty(),
    check('teacherId', 'Tên giảng viên bắt buộc phải chọn').notEmpty(),
    check('name', 'Tên khoá học không quá 100 kí tự').isLength({ max: 100}),
    check('price', 'Học phí bắt buộc phải nhập').notEmpty(),
    // check('email', 'Email không đúng định dạng').isEmail(),
    check('quantity', 'Số lượng học viên bắt buộc phải nhập').notEmpty(),
    check('duration', 'Thời gian học bắt buộc phải nhập').notEmpty(),
   ]
} 