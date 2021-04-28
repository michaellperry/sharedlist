const path = require('path');

function configureRoutes(app) {
    app.get("/", (req, res, next) => {
        res.sendFile(path.join(__dirname, "index.html"));
    });
}

module.exports = { configureRoutes };