import { Item, List } from "@shared/model";
import { collection, field, jinagaContainer, mapProps, specificationFor as projectionFor } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";
import { itemComponent } from "./item-component";

const listProjection = projectionFor(List, {
    list: field(l => l),
    topic: field(l => l.topic),
    Items: collection(j.for(Item.inList), itemComponent)
});

export const ListContainer = jinagaContainer(j, mapProps(listProjection).to(
    ({list, topic, Items}) => {
        const [description, setDescription] = React.useState("");

        const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            j.fact(new Item(list, description, new Date()));
        };

        return (
            <>
                <h1>{topic}</h1>
                <form onSubmit={onSubmit}>
                    <label>
                        New item
                        <input type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </label>
                    <br />
                    <input type="submit" value="Add" />
                </form>
                <Items />
            </>
        );
    }
));