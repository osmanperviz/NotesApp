import passport from 'passport';
import User from '../models/user'
const LocalStrategy = require('passport-local').Strategy


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login',new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
       return console.log("usao sam!!!!");
     })
)

export default passport
