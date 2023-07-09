import passport from 'passport';
import { Strategy } from 'passport-github';
import User, { IUser } from './models/User';

let redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}${process.env.GITHUB_CALLBACK_URL}`;

if (process.env.NODE_ENV === 'prod') {
  redirectUrl = `${process.env.BASE_URL}${process.env.GITHUB_CALLBACK_URL}`;
}

console.log({ redirectUrl });

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: redirectUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        githubId: profile.id,
        displayName: profile.displayName,
        oAuthProvider: profile.provider,
      } as IUser;

      try {
        const user = await User.findOrCreate(newUser);
        done(null, user);
      } catch (error) {
        console.log({ failedOAuthLogin: error });
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.log({ deserializeUser: err });
    done(err);
  }
});
