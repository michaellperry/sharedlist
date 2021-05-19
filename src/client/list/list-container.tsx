import { Item, List } from "@shared/model";
import { ascending, collection, field, jinagaContainer, mapProps, specificationFor as projectionFor } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";
import { itemComponent } from "./item-component";
import { completedItemComponent } from "./completed-item-component";

const listProjection = projectionFor(List, {
    list: field(l => l),
    topic: field(l => l.topic),
    Items: collection(j.for(Item.inList), itemComponent, ascending(i => i.created)),
    CompletedItems : collection(j.for(Item.inCompletedList), completedItemComponent, ascending(i => i.created)),
});

export const ListContainer = jinagaContainer(j, mapProps(listProjection).to(
    ({list, topic, Items, CompletedItems}) => {
        const [description, setDescription] = React.useState("");

        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await j.fact(new Item(list, description, new Date()));
            setDescription("");
        };

        return (
            <>
                <h1>List: {topic}</h1>
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
                <h3>Completed items:</h3>
                <CompletedItems />
            </>
        );
    }
));