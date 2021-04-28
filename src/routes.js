const path = require('path');

function configureRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });

    app.get("/scripts/app.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "app.js"));
    });
    
    app.get("/scripts/main.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "main.js"));
    });
    
    app.get("/scripts/require.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "..", "node_modules", "requirejs", "require.js"));
    });
    
    app.get("/scripts/jinaga.js", (req, res, next) => {
        res.sendFile(path.join(__dirname, "..", "node_modules", "jinaga", "dist", "jinaga.js"));
    });
}

module.exports = { configureRoutes };