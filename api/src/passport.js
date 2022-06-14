const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const googleJSON = require('./json/json.json');
const GOOGLE_CLIENT_ID = process.env.client_ID;//googleJSON.client_id;
const GOOGLE_CLIENT_SECRET = process.env.SECRET;//googleJSON.client_secret;

passport.use(new GoogleStrategy({
    clientID: "298448156365-tal80nggl50ehlcq4cpemnkol3o1ms4v.apps.googleusercontent.com",//GOOGLE_CLIENT_ID,
    clientSecret: "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",//GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));
//https://www.youtube.com/watch?v=7K9kDrtc4S8&t=1034s 1:00:00 ver desde ese punto para entender el front
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});