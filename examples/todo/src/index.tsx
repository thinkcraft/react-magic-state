import * as React from "react";
import { render } from "react-dom";
import { view, createStore } from "../../../src";

interface TodoItem {
    text: string;
    done: boolean;
}

const StoreContext = React.createContext({});

@view
class BaseComponent extends React.PureComponent<any, any> {
    protected get store() {
        return this.context;
    }

    static contextType = StoreContext;
}

class Todo extends BaseComponent {
    private readonly _store = createStore({
        todos: new Array<TodoItem>(),
        input: ""
    });

    render() {
        return (
            <StoreContext.Provider value={this._store}>
                <h1>Todo</h1>
                <p>React: {React.version}</p>
                <p>Updates: {this.state["reactionCount"]}</p>
                <ul>
                    {this._store.todos.map((t, i) =>
                        <TodoListItem key={i} index={i} tag={t} />
                    )}
                </ul>
                <TodoInput />
            </StoreContext.Provider>
        );
    }    
}

class TodoListItem extends BaseComponent {
    render() {
        const { tag, index } = this.props;

        return (
            <li>
                <span style={{ textDecoration: (tag.done ? "line-through" : "none") }}>{tag.text}</span>
                <button onClick={e => this.toggleTodo(index)}>&#x2713;</button>
                <button onClick={e => this.removeTodo(index)}>&#x02A2F;</button>
            </li>
        );
    }

    toggleTodo(index) {
        const todo = this.store.todos[index];

        todo.done = !todo.done;
    }

    removeTodo(index) {
        this.store.todos.splice(index, 1);
    }
}

class TodoInput extends BaseComponent {
    render() {
        const { store } = this;

        return (
            <>
                <input
                    required
                    value={store.input}
                    onKeyDown={e => this.onKeyDown(e)}
                    onChange={e => store.input = e.target.value}
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
        const { store } = this;

        if (!store.input.trim()) {
            return;
        }

        store.todos.push({ text: store.input, done: false });
        store.input = "";
    }
}

render(<Todo />, document.getElementById("app"));