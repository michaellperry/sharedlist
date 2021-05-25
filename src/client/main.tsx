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

    // const items = await j.query(list, j.for(itemsInList));
    // display(items);
})();

function itemsInList(list: any) {
    return j.match({
        type: "SharedList.Item",
        list
    });
}

function display(obj: any) {
    const output = document.createElement("pre");
    output.innerText = JSON.stringify(obj, null, 4);
    document.getElementById("output-host")?.appendChild(output);
}

ReactDOM.render(
    <App />,
    document.getElementById("application-host")
);