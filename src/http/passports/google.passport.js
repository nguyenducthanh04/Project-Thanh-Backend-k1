var GoogleStrategy = require("passport-google-oauth20").Strategy;
const model = require("../../models/index");
const flash = require("connect-flash");
const User = model.User;
const user_socials = model.user_socials;
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const { displayName, emails } = profile;
    const { id: Idgoogle } = profile;
    const [{ value: email }] = emails;
    //nếu đang login tức là đang thực hiện hành động liên kết mxh -> done thông tin user + provider, provierID
    //controller sẽ xử lý thêm provider và providerId vào table userSOcial.
    if (request.isAuthenticated()) {
      // Kiểm tra email có tồn tại bảng user không
      // Nếu có tồn tại return done(null, request.user, { message: "Email đã liên kết" });
      // nếu không tồn tại thì xử
      const userAccount = await User.findOne({
        where: {
          email: email,
        },
      });
      const provider = "google";
      let providerDetail = await user_socials.findOne({
        where: {
          provider: provider,
          email: email,
        },
      });
      if (!providerDetail) {
        providerDetail = await user_socials.create({
          provider: provider,
          providerId: Idgoogle,
          userId: request.user.id,
          email: email,
        });
        const user = await User.findOne({
          where: {
            id: providerDetail.userId,
          },
        });
        request.flash("success", "Liên kết đăng nhập với Google thành công");
        return done(null, user, { message: "Liên kết thành công" });
      } else {
        console.log("Tài khoản đã liên kết ");
        request.flash("error", "Email đã được liên kết với tài khoản khác!");
        return done(null, request.user, { message: "Tài khoản đã liên kết" });
      }

      //Trường hợp chưa login thì sẽ là đang thực hiện hành động login mạng xã hội -> Ktra providerId có tồn tại hay không, nếu có thì done thông tin user+proividerId
      //controller sẽ xử lý tiếp, nếu không có thì done error là "Tài khoản chưa liên kết hoặc không tồn tại".
    } else {
      let providerIdCheck = await user_socials.findOne({
        where: {
          providerId: Idgoogle,
          email: email,
        },
      });
      // nNếu không có providerId => done lỗi Tài khoản chưa liên kết/ Tài khoản không tồn tại
      // Nếu có => lấy thông tin user từ providerId(Sử eager loading).
      // lay user
      const user = await User.findByPk(providerIdCheck?.userId);
      // let user = request.user;
      if (providerIdCheck) {
        return done(null, user);
      } else {
        request.flash(
          "error",
          "Đăng nhập thất bại! Tài khoản chưa được liên kết với Google"
        );
        return done(null, false, { message: "Tài khoản chưa liên kết" });
      }
    }
  }
);
