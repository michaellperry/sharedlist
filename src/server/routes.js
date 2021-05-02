const path = require('path');
const express = require('express');

function configureRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "..", "..", "dist", "main.html"));
    });

    app.use('/scripts', express.static(path.join(__dirname, "..", "..", "dist", "scripts")));
}

module.exports = { configureRoutes };