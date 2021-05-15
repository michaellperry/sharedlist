import * as React from "react";
import { field, jinagaContainer, mapProps, specificationFor } from "jinaga-react";
import { j } from "../jinaga-config";
import { List } from "@shared/model";

const listProjection = specificationFor(List, {
    topic: field(l => l.topic)
});

export const ListContainer = jinagaContainer(j, mapProps(listProjection).to(
    ({topic}) => (
        <h1>{topic}</h1>
    )
));