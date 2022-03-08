var GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");
const GOOGLE_CLIENT_ID = "jjjjjjjjjjjjj";
const GOOGLE_CLIENT_SECRET = "pppppppppppp";

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
