import { json } from "body-parser";
import cors from "cors";
import express, { urlencoded } from "express";
import http from "http";
import { configureJinaga } from "./jinaga-config";
import { configureRoutes } from "./routes";
import { startTracing, traceInfo } from "./tracing";

startTracing();

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(urlencoded());
app.use(json());
app.use(cors());

configureRoutes(app);
configureJinaga(app);

server.listen(app.get("port"), () => {
    traceInfo(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    traceInfo("  Press CTRL-C to stop\n");
});