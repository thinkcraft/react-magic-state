import * as React from "react";
import { BaseComponent } from "./BaseComponent";
import { createStore } from "../../../../src";

export class TodoInput extends BaseComponent {
    private _state = createStore({
        input: ""
    });

    render() {
        return (
            <>
                <input
                    required
                    value={this._state.input}
                    onKeyDown={e => this.onKeyDown(e)}
                    onChange={e => this._state.input = e.target.value}
                />
                <button onClick={e => this.addTodo()}>Add</button>
            </>
        );
    }

    onKeyDown(e) {
        if (e.key === "Enter") {
            this.addTodo();
        }
    }

    addTodo() {
        if (!this._state.input.trim()) {
            return;
        }

        this.store.add(this._state.input);
        this._state.input = "";
    }
}