import { Application, Handler } from "express";
import { deserializeUser, initialize, serializeUser, session } from "passport";
import { configureAuthenticationApple } from "./apple";

export function configureAuthentication(app: Application) {
  serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  deserializeUser((id, done) => {
    done(null, JSON.parse(<string>id));
  });

  app.use(initialize());
  app.use(session());

  configureAuthenticationApple(app);

  const authenticate: Handler = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  return authenticate;
}
