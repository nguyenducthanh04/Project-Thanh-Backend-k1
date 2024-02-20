var GoogleStrategy = require("passport-google-oidc");
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
    scope: ["profile"],
  },
  async (request, issuer, profile, _, done) => {
    console.log("pờ zồ fai: ", profile);
    const { displayName, emails } = profile;
    const { id: Idgoogle } = profile;
    //nếu đang login tức là đang thực hiện hành động liên kết mxh -> done thông tin user + provider, provierID
    //controller sẽ xử lý thêm provider và providerId vào table userSOcial.
    // console.log(request.user);
    console.log("req:", request);
    if (request.isAuthenticated()) {
      const provider = "google";
      let providerDetail = await user_socials.findOne({
        where: {
          provider: provider,
        },
      });

      if (!providerDetail) {
        providerDetail = await user_socials.create({
          provider: provider,
          providerId: Idgoogle,
          userId: request.user.id,
        });
        const user = await User.findOne({
          where: {
            id: providerDetail.userId,
          },
        });
        console.log("Liên kết thành công");
        request.flash("success", "Liên kết đăng nhập với Google thành công");
        return done(null, user, { message: "Liên kết thành công" });
      }
      console.log("Liên kết thất bại");
      // console.log("Liên kết tài khoản thành công");
      return done(null, false, { message: "Tài khoản đã liên kết" });

      //Trường hợp chưa login thì sẽ là đang thực hiện hành động login mạng xã hội -> Ktra providerId có tồn tại hay không, nếu có thì done thông tin user+proividerId
      //controller sẽ xử lý tiếp, nếu không có thì done error là "Tài khoản chưa liên kết hoặc không tồn tại".
    } else {
      let providerIdCheck = await user_socials.findOne({
        where: {
          providerId: Idgoogle,
        },
      });
      // nNếu không có providerId => done lỗi Tài khoản chưa liên kết/ Tài khoản không tồn tại
      // Nếu có => lấy thông tin user từ providerId(Sử eager loading).
      // lay user
      const user = await User.findByPk(providerIdCheck?.userId);
      // let user = request.user;
      console.log(`Thông tin User: ${user}`);
      if (providerIdCheck) {
        return done(null, user);
      } else {
        request.flash(
          "error",
          "Đăng nhập thất bại! Tài khoản chưa được liên kết với Google"
        );
        console.log(`Tài khoản chưa liên kết`);
        return done(null, false, { message: "Tài khoản chưa liên kết" });
      }
    }
  }
);
