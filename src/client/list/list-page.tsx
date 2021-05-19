import { List } from "@shared/model";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { ListContainer } from "./list-container";

export const ListPage = ({}) => {
    const { topic } = useParams<{topic: string}>();

    return (
        <>
            <Link to="/">Home</Link>
            <ListContainer fact={new List(topic)} />
        </>
    );
};