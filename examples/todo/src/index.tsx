import * as React from "react";
import { render } from "react-dom";
import { TodoApp } from "./components/TodoApp";
import { StoreContext } from "./components/BaseComponent";
import { createStore } from "../../../src";
import { Store } from "./state/store";

const store = createStore(new Store());

render(
    <StoreContext.Provider value={store}>
        <TodoApp />
    </StoreContext.Provider>,
    document.getElementById("app")
);

module["hot"]?.accept();
