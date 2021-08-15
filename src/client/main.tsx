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
    //     description: "Tribbles",
    //     created: new Date()
    // });

    // display(item);

    // const items = await j.query(list, j.for(itemsInList));
    // display(items);
})();

// @ts-ignore
function itemsInList(list) {
    return j.match({
        type: "SharedList.Item",
        list
    });
}

// @ts-ignore
function display(obj) {
    const output = document.createElement("pre");
    output.innerText = JSON.stringify(obj, null, 4);
    document.getElementById("output-host")?.appendChild(output);
}

ReactDOM.render(
    <App />,
    document.getElementById("application-host")
);