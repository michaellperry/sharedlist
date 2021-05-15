import { JinagaBrowser } from "jinaga";
import { App } from "./app";
import * as React from "react";
import * as ReactDOM from "react-dom";

const j = JinagaBrowser.create({
    httpEndpoint: "/jinaga"
});

j.fact({
    type: "MyApplication.Visit",
    date: new Date()
});

ReactDOM.render(
    <App />,
    document.getElementById("application-host")
);