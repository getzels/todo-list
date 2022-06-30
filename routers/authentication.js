require("../config/passport");
const passport = require('passport');
const routes = require('express').Router();
const session = require('express-session');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

routes.use(passport.initialize());
routes.use(passport.session());

routes.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})

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
        res.redirect('/auth/success')

    }
);

routes.get("/logout", (req, res,next) => {
    req.session = null;
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

routes.get("/failed", (req, res) => {
    res.send("Failed")
})

routes.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
});

module.exports = routes;