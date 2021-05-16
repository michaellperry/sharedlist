import express from "express";
import { JinagaServer } from "jinaga";

export function configureJinaga(app: express.Express) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', handler);
}
