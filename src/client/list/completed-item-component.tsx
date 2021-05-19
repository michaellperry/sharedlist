import { Item } from "@shared/model";
import { field, mapProps, specificationFor as projectionFor } from "jinaga-react";
import * as React from "react";

const itemProjection = projectionFor(Item, {
    description: field(i => i.description)
});

export const completedItemComponent = mapProps(itemProjection).to(
    ({description}) => (
        <div>           
            <p>{description}</p>
        </div>
    )
);