import path from "path";
import { Express, Handler, static as staticFiles } from "express";
import { traceInfo } from "./tracing";

export function configureRoutes(app: Express, authenticate: Handler) {
    app.get("/login", (req, res, next) => {
        traceInfo(`Serving ${req.url}`);
        res.sendFile(path.join(__dirname, "login.html"));
    });
    app.get(["/", "/:topic"], authenticate, (req, res, next) => {
        traceInfo(`Serving ${req.url}`);
        res.sendFile(path.join(__dirname, "main.html"));
    });

    app.use('/scripts', staticFiles(
        path.join(__dirname, "..", "scripts"),
        { maxAge: "365d" }
    ));
}
