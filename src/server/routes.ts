import path from "path";
import express from "express";
import { authenticate } from "./authentication/appleid";

export function configureRoutes(app: express.Express) {
    app.get(["/", "/:topic"], (req, res, next) => {
        res.sendFile(path.join(__dirname, "main.html"));
    });

    app.use('/scripts', express.static(
        path.join(__dirname, "..", "scripts"),
        { maxAge: "365d" }
    ));

    app.post("/auth/apple", (req, res, next) => {
        authenticate(req, res).catch(next);
    });
}
