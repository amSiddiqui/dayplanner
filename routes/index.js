const express = require("express"),
    router = express.Router(),
    passport = require('passport');

// Landing page
router.get("/", (req, res) => {
    res.render("landing");
});

// Login page

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", passport.authenticate('local-login', {
    successRedirect: "/schedule",
    failureRedirect: "/login"
}));

router.get("/signup", (req, res)=>{
    res.render("signup");
});

router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/schedule',
    failureRedirect: '/singup'
}
));

router.get("/logout", (req, res)=>{
    req.session.destroy(err => {
        res.redirect('/');
    });
});

function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;