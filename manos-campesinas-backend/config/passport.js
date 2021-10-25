const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { User } = require('../models')

module.exports = app => {
    app.use(passport.initialize());
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope: ['email', 'profile'],
        session: false,
        passReqToCallback: true
    },
        async (req, accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile)
                const [user, created] = await User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        name: profile.displayName,
                        mail: profile.emails[0].value,
                        username: profile.emails[0].value.split('@')[0],
                        role: "vendedor",
                        googleId: profile.id
                    }
                })
                return cb(null, {
                    user,
                    profile,
                    accessToken,
                    req
                })

            } catch (error) {
                throw error
            }

        }))
};