const GitHubStrategy = require("passport-github").Strategy;
const model = require("../../models/index");
const user_socials = model.user_socials;
const flash = require("connect-flash");
const User = model.User;
module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile"],
  },
  async (request, issuer, _, profile, done) => {
    if (request.isAuthenticated()) {
      const provider = "github";
      console.log("profile-github:", profile);
      let providerDetail = await user_socials.findOne({
        where: {
          provider: provider,
        },
      });
      if (!providerDetail) {
        providerDetail = await user_socials.create({
          provider: provider,
          providerId: profile.id,
          userId: request.user.id,
        });
        const user = await User.findOne({
          where: {
            id: providerDetail.userId,
          },
        });
        request.flash("success", "Liên kết đăng nhập với Gihub thành công");
        return done(null, user, { message: "Liên kết thành công" });
      } else {
        console.log("Tài khoản đã liên kết ");
        request.flash("error", "Email đã được liên kết với tài khoản khác!");
        return done(null, request.user, { message: "Tài khoản đã liên kết" });
      }
    } else {
      let providerIdCheck = await user_socials.findOne({
        where: {
          providerId: profile.id,
        },
      });
      const user = await User.findByPk(providerIdCheck?.userId);
      if (providerIdCheck) {
        return done(null, user);
      } else {
        request.flash(
          "error",
          "Đăng nhập thất bại! Tài khoản chưa được liên kết với Github"
        );
        return done(null, false, { message: "Tài khoản chưa liên kết" });
      }
    }
  }
);
