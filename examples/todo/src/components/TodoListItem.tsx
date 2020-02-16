import * as React from "react";
import { BaseComponent } from "./BaseComponent";

export class TodoListItem extends BaseComponent {
    render() {
        const { todo } = this.props;

        return (
            <li>
                <span style={{ textDecoration: (todo.done ? "line-through" : "none") }}>{todo.text}</span>
                <button onClick={e => this.toggleTodo(todo.id)}>&#x2713;</button>
                <button onClick={e => this.removeTodo(todo.id)}>&#x02A2F;</button>
            </li>
        );
    }

    toggleTodo(id) {
        this.store.toggle(id);
    }

    removeTodo(id) {
        this.store.remove(id);
    }
}