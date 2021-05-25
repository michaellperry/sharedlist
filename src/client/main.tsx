import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";
import { j } from "./jinaga-config";

(async () => {
    // const list = await j.fact({
    //     type: "SharedList.List",
    //     topic: "villains"
    // });

    // const item = await j.fact({
    //     type: "SharedList.Item",
    //     list,
    //     description: "Daleks",
    //     created: new Date()
    // });
})();

ReactDOM.render(
    <App />,
    document.getElementById("application-host")
);