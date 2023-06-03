import { json } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { urlencoded } from "express";
import session from "express-session";
import http from "http";
import { configureAuthentication } from "./authentication/authentication";
import { configureJinaga } from "./jinaga-config";
import { configureRoutes } from "./routes";
import { startTracing, traceInfo } from "./tracing";

startTracing();

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(session({
    secret: process.env.SESSION_SECRET || 'tacocat',
    resave: false,
    saveUninitialized: true
  }));
app.use(cookieParser());
app.use(urlencoded());
app.use(json());
app.use(cors());

const authenticate = configureAuthentication(app);
configureRoutes(app, authenticate);
configureJinaga(app, authenticate);

server.listen(app.get("port"), () => {
    traceInfo(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    traceInfo("  Press CTRL-C to stop\n");
});