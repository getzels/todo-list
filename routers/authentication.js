require("../config/passport");
const passport = require('passport');
const routes = require('express').Router();

routes.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

routes.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

routes.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})