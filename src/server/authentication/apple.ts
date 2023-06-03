import { Application } from "express";
import { use, authenticate } from "passport";
import AppleStrategy from "passport-apple";
import { traceError, traceInfo } from "../tracing";

function getPrivateKeyInPEMFormat() {
  // Get the AUTH_KEY environment variable.
  // Split it into 64 character lines.
  // Join them back with newlines.
  // Prefix the text with "-----BEGIN PRIVATE KEY-----\n"
  // and append "-----END PRIVATE KEY-----".

  if (!process.env.AUTH_KEY)
    throw new Error("Please set the AUTH_KEY environment variable to the base-64 encoded contents of your p8 key file.");

  const privateKey = process.env.AUTH_KEY.replace(/(.{64})/g, "$1\n");
  return "-----BEGIN PRIVATE KEY-----\n" + privateKey + "\n-----END PRIVATE KEY-----";
}

export function configureAuthenticationApple(app: Application) {
  if (!process.env.AUTH_CLIENT_ID)
    throw new Error("Please set the AUTH_CLIENT_ID environment variable to your Apple client ID.");

  if (!process.env.AUTH_TEAM_ID)
    throw new Error("Please set the AUTH_TEAM_ID environment variable to your Apple team ID.");

  if (!process.env.AUTH_REDIRECT_URI)
    throw new Error("Please set the AUTH_REDIRECT_URI environment variable to your Apple redirect URI.");

  if (!process.env.AUTH_KEY_ID)
    throw new Error("Please set the AUTH_KEY_ID environment variable to your Apple key ID.");

  use(new AppleStrategy({
    clientID: process.env.AUTH_CLIENT_ID,
    teamID: process.env.AUTH_TEAM_ID,
    callbackURL: process.env.AUTH_REDIRECT_URI,
    keyID: process.env.AUTH_KEY_ID,
    privateKeyString: getPrivateKeyInPEMFormat(),
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, decodedIdToken, profile, done) => {
    traceInfo(`Apple authentication succeeded for ${JSON.stringify(decodedIdToken)}: ${JSON.stringify(profile)}}`);
    const user = {
      provider: profile.provider,
      id: profile.id,
      profile: {
          username: profile.username,
          name: profile.name,
          displayName: profile.displayName
      }
    }
    done(null, user);
  }));

  app.get('/auth', authenticate('apple'));
  app.post("/auth/apple", (req, res, next) => {
      authenticate('apple', (err: any, user: Express.User | false | null, info: object | string | Array<string | undefined>) => {
        if (err) {
          traceError(`Apple authentication failed: ${err}`);
          res.redirect("/login");
        } else {
          if (!user) {
            traceError(`No user returned: ${info}`);
            res.redirect("/login");
          } else {
            traceInfo(`Apple authentication succeeded for user ${JSON.stringify(user)}`);
            res.redirect("/");
          }
        }
      })(req, res, next);
    });
}