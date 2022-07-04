const passport = require("../config/passport");
const routes = require('express').Router();

function isLoggedIn (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json('user-not-login');
    }
    return true;
};

routes.use(passport.initialize());
routes.use(passport.session());

routes.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

routes.post('/logout', function(req, res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

routes.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failed',
    }));

module.exports = {
    routes:routes,
    isLoggedIn:isLoggedIn
};