const bCrypt = require('bcrypt');
module.exports = function (user, passport) { 
    var User = user; 
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email , password, done){
        // Envcrypting function
        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        
        // Checking if user already exists. If not then create new user
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if(user){
                return done(null, false, {message: "Username already taken"});
            }else{
                var userPass = generateHash(password);
                var data = {
                    email: email,
                    password: userPass,
                    first_name: req.body.firstname,
                    last_name: req.body.lastname
                };
                User.create(data).then((newUser, created)=>{
                    if(!newUser){
                        return done(null, false);
                    }else{
                        return done(null, newUser);
                    }
                });
            }
        });
    }
    ));
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((user, done)=>{
        if(user){
            done(null, user);
        }else{
            done(user.errors, null);
        }
    });
};
