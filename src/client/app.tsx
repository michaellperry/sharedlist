import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./home/home-page";
import { ListPage } from "./list/list-page";

export const App = ({}) => (
    <Router>
        <Switch>
            <Route path="/:topic">
                <ListPage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    </Router>
);