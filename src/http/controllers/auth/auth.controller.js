const bcrypt = require("bcrypt");
const md5 = require("md5");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "jsonwebtoken-secret";
const model = require("../../../models/index");
const { Op } = require("sequelize");
const User = model.User;
const user_otp = model.user_otp;
const createTokenUtil = require("../../../utils/loginToken");
const login_tokens = model.login_tokens;
const user_socials = model.user_socials;
module.exports = {
  login: async (req, res) => {
    try {
      const msg = req.flash("error");
      const msgType = msg ? "danger" : "success";
      const success = req.flash("success");
      const user = req.user;
      res.render("auth/login", {
        msg,
        msgType,
        success,
        layout: "layouts/auth.layout.ejs",
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  handleLogin: async (req, res) => {
    try {
      const { email } = req.body;
      if (req.user.firstLogin === 1) {
        return res.redirect("/auth/changePassFirtLogin");
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "dducthanh04@gmail.com",
          pass: "midn lcia tcly pcbn",
        },
      });
      const otp = Math.floor(Math.random() * 10000);
      transporter.sendMail({
        from: `Thanh Nguyen <dducthanh04@gmail.com>`, // sender address
        to: email, // list of receivers
        subject: "Verify OTP", // Subject line
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Hello</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Your Brand Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>`, // html body
      });
      await user_otp.destroy({
        where: {
          userId: req.user.id,
        },
      });
      await user_otp.create({
        userId: req.user.id,
        otp: otp,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });
      const otpLogin = await user_otp.findOne({
        where: {
          userId: req.user.id,
        },
      });
      return res.redirect("/auth/verifyTwoFa");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  logout: (req, res, next) => {
    try {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.clearCookie("loginToken");
        return res.redirect("/auth/login");
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  verifyTwoFa: (req, res) => {
    try {
      const user = req.user;
      return res.render("auth/2fa", {
        layout: "layouts/auth.layout.ejs",
        user,
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  handleVerify: async (req, res) => {
    try {
      const { otp } = req.body;
      const check = await user_otp.findOne({
        where: {
          [Op.and]: [{ userId: req.user.id }, { otp: otp }],
        },
      });

      if (check) {
        const loginToken = await login_tokens.findOne({
          where: {
            userId: req.user.id,
          },
        });
        const cookie = md5(Math.random());
        if (!loginToken) {
          await login_tokens.create({
            userId: req.user.id,
            token: cookie,
          });
          res.cookie("loginToken", cookie, { httpOnly: true });
        } else {
          login_tokens.destroy({
            where: {
              userId: req.user.id,
            },
          });
          await login_tokens.create({
            userId: req.user.id,
            token: cookie,
          });
          res.cookie("loginToken", cookie, { httpOnly: true });
        }
        if (req.user.typeId === 1) {
          return res.redirect("/admin");
        } else if (req.user.typeId === 2) {
          return res.redirect("/teacher");
        }
        return res.redirect("/student");
      } else {
        res.redirect("/auth/verifyTwoFa");
        return;
      }
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  forgetPassword: async (req, res) => {
    res.render("auth/forget", { layout: "layouts/auth.layout.ejs" });
  },
  handleForget: async (req, res) => {
    try {
      const { email } = req.body;
      const token = jwt.sign(req.body, secret, { expiresIn: "900s" });
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
        from: `Thanh Nguyen <dducthanh04@gmail.com>`, // sender address
        to: email, // list of receivers
        subject: "Reset password", // Subject line
        html: ` <p>Click vào link dưới đây để đặt lại mật khẩu</p>
      <a href="http://127.0.0.1:3000/auth/resetPass/${token}">Link đặt lại mật khẩu</a>`, // html body
      });
      req.flash("success", "Gửi yêu cầu đặt lại mật khẩu thành công!");
      res.redirect("/auth/login");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  resetPass: async (req, res) => {
    try {
      const { token } = req.params;
      const msg = req.flash("error");
      const value = jwt.verify(token, secret);
      if (value) {
        const user = await User.findOne({
          where: { email: value.email },
        });
        req.flash("user", user);

        res.render("auth/reset", { layout: "layouts/auth.layout.ejs", msg });
        return;
      }
      res.send("Link đã hết hạn !");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  handleReset: async (req, res) => {
    try {
      const { token } = req.params;
      if (!token) {
        return res.redirect("/auth/login");
      }
      const salt = 10;
      const user = req.flash("user");
      const { password, resetpassword } = req.body;
      if (password !== resetpassword) {
        req.flash("error", "Mật khẩu không khớp");
        res.redirect(`/auth/resetPass/${token}`);
        return;
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        const value = await User.update(
          { password: hash },
          {
            where: {
              email: user[0].email,
            },
          }
        );
        if (value) {
          req.flash("msg", "Cập nhập mật khẩu thành công!");
          res.redirect("/auth/login");
          return;
        }
      });
      return;
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  googleLogin: async (req, res) => {
    try {
      const loginToken = await login_tokens.findOne({
        where: {
          userId: req.user.id,
        },
      });
      if (loginToken.token !== req.cookies.loginToken) {
        const token = await createTokenUtil(req.user.id);
        res.cookie("loginToken", token, { httpOnly: true });
        if (req.user.typeId === 1) {
          return res.redirect("/admin");
        } else if (req.user.typeId === 2) {
          return res.redirect("/teacher");
        } else if (req.user.typeId === 3) {
          return res.redirect("/student");
        }
      }
      console.log("Type User: ", req.user.typeId);
      if (req.user.typeId === 1) {
        return res.redirect("/admin/settings");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      }
      return res.redirect("/student");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  githubLogin: async (req, res) => {
    try {
      const loginToken = await login_tokens.findOne({
        where: {
          userId: req.user.id,
        },
      });
      if (loginToken.token !== req.cookies.loginToken) {
        const token = await createTokenUtil(req.user.id);
        res.cookie("loginToken", token, { httpOnly: true });
        if (req.user.typeId === 1) {
          return res.redirect("/admin");
        } else if (req.user.typeId === 2) {
          return res.redirect("/teacher");
        } else if (req.user.typeId === 3) {
          return res.redirect("/student");
        }
      }

      if (req.user.typeId === 1) {
        return res.redirect("/admin/settings");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      }
      return res.redirect("/student");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  changePassFirstLogin: async (req, res) => {
    try {
      const user = req.user;
      res.render("auth/changePassFirstLogin", {
        layout: "layouts/auth.layout.ejs",
      });
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
  handleChangePassFirstLogin: async (req, res) => {
    try {
      const users = req.user;
      const salt = 10;
      const { password } = req.body;
      bcrypt.hash(password, salt, async function (err, hash) {
        const value = await User.update(
          { password: hash },
          {
            where: {
              email: users.email,
            },
          }
        );
      });
      const userUpdate = await User.update(
        { firstLogin: 2 },
        {
          where: {
            email: users.email,
          },
        }
      );
      const loginToken = await login_tokens.findOne({
        where: {
          userId: req.user.id,
        },
      });
      const cookie = md5(Math.random());
      if (!loginToken) {
        await login_tokens.create({
          userId: req.user.id,
          token: cookie,
        });
        res.cookie("loginToken", cookie, { httpOnly: true });
      } else {
        login_tokens.destroy({
          where: {
            userId: req.user.id,
          },
        });
        await login_tokens.create({
          userId: req.user.id,
          token: cookie,
        });
        res.cookie("loginToken", cookie, { httpOnly: true });
      }
      if (req.user.typeId === 1) {
        return res.redirect("/admin");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      }
      return res.redirect("/student");
    } catch (error) {
      res.status(500).send("Đã xảy ra lỗi. Chúng tôi đang tìm cách cải thiện.");
    }
  },
};
