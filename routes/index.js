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

router.get("/signup", (req, res)=>{
    res.render("signup");
});

router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/schedule',
    failureRedirect: '/singup'
}
));

module.exports = router;