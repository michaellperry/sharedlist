const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { configureRoutes } = require('./routes');
const { configureJinaga } = require('./jinaga');

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());

configureRoutes(app);
configureJinaga(app);

server.listen(app.get("port"), () => {
    console.log(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});