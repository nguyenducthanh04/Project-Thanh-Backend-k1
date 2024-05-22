var express = require("express");
var router = express.Router();
var passport = require("passport");
const nodemailer = require("nodemailer");
const AuthController = require("../../http/controllers/auth/auth.controller");
const LoginMiddleware = require("../../http/middlewares/login/loginLocalMiddleware");
const AuthMiddleware = require("../../http/middlewares/auth.middleware");
const TwoFaMiddleware = require("../../http/middlewares/2fa.auth.middleware");
/* GET home page. */
router.get("/login", AuthController.login);
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
  router.get("/login", AuthController.login);
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
router.post("/send-mail", async function (req, res) {
  const { email, content, name } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dducthanh04@gmail.com",
        pass: "midn lcia tcly pcbn",
      },
    });

    transporter.sendMail({
      from: `Người nhận tin nhắn:<${email}>`,
      to: "dducthanh04@gmail.com",
      subject: "Contact",
      html: `<div">
      <h3 style:"text-align: center">Tin nhắn từ ${name} gửi đến bạn: <em>${content}</em></h3>
      </div>`,
    });

    res.send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("An error occurred while sending the email");
  }
});
module.exports = router;
