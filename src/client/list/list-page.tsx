import { Completed, Item, List } from "@shared/model";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { j } from "../jinaga-config";
import { ListContainer } from "./list-container";

export const ListPage = ({}) => {
    const { topic } = useParams<{topic: string}>();

    const list = new List(decodeURI(topic));

    React.useEffect(() => {
        const itemSubscription = j.subscribe(list, j
            .for(Item.inList));
        const completedSubscription = j.subscribe(list, j
            .for(Item.inCompletedList)
            .then(Completed.forItem));
            
        return () => {
            itemSubscription.stop();
            completedSubscription.stop();
        }
    }, [topic]);

    return (
        <>
            <Link to="/">Home</Link>
            <ListContainer fact={list} />
        </>
    );
};