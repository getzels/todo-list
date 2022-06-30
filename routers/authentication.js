require("../config/passport");
const passport = require('passport');
const routes = require('express').Router();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

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

routes.get("/failed", (req, res) => {
    res.send("Failed")
})
routes.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
});

module.exports = routes;