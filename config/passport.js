const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const db = require('../models');
user = db.user;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL: process.env.AUTH_CALLBACK,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        user.findOrCreate({ id: profile.id,
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email }, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport;

