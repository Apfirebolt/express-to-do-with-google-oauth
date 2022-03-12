const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
// Load user model
const User = mongoose.model('users');


module.exports = function(passport){
  passport.use(new GitHubStrategy({
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: '/auth/github/callback',
  }, (accessToken, refreshToken, profile, done) => {
      
      const newUser = {
        githubId: profile.id,
        firstName: profile.displayName,
      }

      // Check for existing user
      User.findOne({
        githubId: profile.id
      })
      .then(user => {
        if(user){
          // Return user
          done(null, user);
        } else {
          // Create user
          new User(newUser)
            .save()
            .then(user => done(null, user));
        }
      })
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
}