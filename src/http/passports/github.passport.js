const GitHubStrategy = require('passport-github').Strategy;
const model = require('../../models/index');
const user_socials = model.user_socials;
const flash = require("connect-flash");
const User = model.User;
module.exports = new GitHubStrategy(
    {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true,
    scope: ["profile"]
  },
      async (request, issuer, _, profile, done) => {
        // console.log(request);
        console.log(_);
        console.log('issuer day:',issuer);
        console.log('profile github: ',profile);
        console.log(profile.id);
        if(request.isAuthenticated()) {
            const provider = 'github';
            let providerDetail = await user_socials.findOne({
                where: {
                    provider: provider,
                }
            })
            if(!providerDetail) {
                providerDetail = await user_socials.create({
                        provider: provider,
                        providerId: profile.id,
                        userId: request.user.id,
                    })
            }
            const user = await User.findOne({
                where: {
                    id: providerDetail.userId,
                }
            })
            console.log("Liên kết tài khoản thành công");
            return done(null, user, {message: 'Liên kết thành công'})
        } else {
            let providerIdCheck = await user_socials.findOne({
                where: {
                    providerId: profile.id,
                }
            })
            const user = await User.findByPk(providerIdCheck?.userId);
            console.log(`Thông tin User: ${user}`);
            if(providerIdCheck) {
                return done(null, user);
            } else {
                console.log(`Tài khoản chưa liên kết`);
               return done(null, false, {message: 'Tài khoản chưa liên kết'})
            }

        }
      }
)