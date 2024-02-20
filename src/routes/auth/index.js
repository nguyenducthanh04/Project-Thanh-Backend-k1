var express = require("express");
var router = express.Router();
var passport = require("passport");
const AuthController = require("../../http/controllers/auth/auth.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
const TwoFaMiddleware = require("../../http/middlewares/2fa.auth.middleware");
/* GET home page. */
router.get("/login", LoginMiddleware, AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  AuthController.handleLogin
);
router.get("/logout", AuthController.logout);
router.get("/verifyTwoFa", TwoFaMiddleware, AuthController.verifyTwoFa);
router.post("/verifyTwoFa", AuthController.handleVerify);
router.get("/redirect", (req, res) => {
  console.log(`REDIRECT`);
  const cookie = req.cookies["connect.sid"];
  res.redirect(req.query.url + "?cookie=" + cookie);
});
router.get("/forgetPassword", AuthController.forgetPassword);
router.post("/forgetPassword", AuthController.handleForget);
router.get("/resetPass/:token", AuthController.resetPass);
router.post("/resetPass/:token", AuthController.handleReset);
router.get("/google/redirect", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  AuthController.googleLogin
);
router.get("/github/redirect", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
  AuthController.githubLogin
);
router.get("/changePassFirtLogin", AuthController.changePassFirstLogin);
router.post("/changePassFirtLogin", AuthController.handleChangePassFirstLogin);

module.exports = router;
