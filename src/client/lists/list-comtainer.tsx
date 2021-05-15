import * as React from "react";
import { jinagaContainer, mapProps, specificationFor } from "jinaga-react";
import { j } from "../jinaga-config";
import { List } from "@shared/model";

const listProjection = specificationFor(List, {

});

export const ListContainer = jinagaContainer(j, mapProps(listProjection).to(
    ({}) => (
        <p>List goes here</p>
    )
));