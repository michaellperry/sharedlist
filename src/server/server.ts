import { json } from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { configureJinaga } from "./jinaga-config";
import { configureRoutes } from "./routes";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(json());
app.use(cors());

configureRoutes(app);
configureJinaga(app);

server.listen(app.get("port"), () => {
    console.log(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});