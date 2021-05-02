import path from "path";
import express from "express";

export function configureRoutes(app: express.Express) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "main.html"));
    });

    app.use('/scripts', express.static(path.join(__dirname, "scripts")));
}
