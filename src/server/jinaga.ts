import express from "express";
import { JinagaServer } from "jinaga";

function configureJinaga(app: express.Express) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', handler);
}

module.exports = { configureJinaga };