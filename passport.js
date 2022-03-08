var GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");
const GOOGLE_CLIENT_ID = "310682578003-l2cpbot9rbitbl89383s3b1bofoe2pah.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);

  // For mongoDb

  // const  uesr ={
  //     username : profile.displayName,
  //     avatar : profile.photo[0],
  // };
  // user.save()
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
