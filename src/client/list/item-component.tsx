import { Completed, Item } from "@shared/model";
import { field, mapProps, specificationFor as projectionFor } from "jinaga-react";
import * as React from "react";
import { j } from "../jinaga-config";

const itemProjection = projectionFor(Item, {
    item: field(i => i),
    description: field(i => i.description)
});

export const itemComponent = mapProps(itemProjection).to(
    ({item, description}) => (
        <div>
            <label>
                <input type="checkbox"
                    onChange={e => j.fact(new Completed(item))}
                />
                {description}
            </label>
        </div>
    )
);