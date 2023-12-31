var express = require("express");
var router = express.Router();
const DashboardController = require("../../http/controllers/admin/dashboard.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
const AdminController = require('../../http/controllers/admin/dashboard.controller')
/* GET home page. */
router.get("/", AuthMiddleware, DashboardController.index);
router.get('/deleteSocial', AdminController.deleteSocial)
router.get('/deleteSocialGithub', AdminController.deleteSocialGithub)
router.get('/changeProfile', AuthMiddleware, AdminController.changeProfile)
router.post('/changeProfile', AuthMiddleware, AdminController.handleChangeProfile)
router.get('/account', AuthMiddleware, AdminController.account)
router.get('/settings', AuthMiddleware, AdminController.settingAdmin)
router.get('/changePass', AuthMiddleware, AdminController.changePassword)
router.post('/changePass', AdminController.handleChangePass)

module.exports = router;
