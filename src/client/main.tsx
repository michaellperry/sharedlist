import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";
import { j } from "./jinaga-config";

j.fact({
    type: "MyApplication.Visit",
    date: new Date()
});

ReactDOM.render(
    <App />,
    document.getElementById("application-host")
);