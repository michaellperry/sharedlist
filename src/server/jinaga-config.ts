import { Express, Handler } from "express";
import { JinagaServer } from "jinaga";

export function configureJinaga(app: Express, authenticate: Handler) {
    const { handler } = JinagaServer.create({});

    app.use('/jinaga', authenticate, handler);
}
