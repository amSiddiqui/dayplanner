const bCrypt = require('bcrypt');
module.exports = function (user, passport) { 
    var User = user; 
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(user, email , password, done){
        // Envcrypting function
        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        }

        // Checking if user already exists.

    }
    ));
}
