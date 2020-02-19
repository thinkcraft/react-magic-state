import * as React from "react";
import { BaseComponent } from "./BaseComponent";
import { TodoInput } from "./TodoInput";
import { TodoListItem } from "./TodoListItem";

export class TodoApp extends BaseComponent {
    render() {
        return (
            <div className="todo-app">
                <h1>Todo</h1>
                <p>React: {React.version}</p>
                <p>Updates: {this.state["reactionCount"]}</p>
                <ul>
                    {this.store.todos.map(t =>
                        <TodoListItem key={t.id} todo={t} />
                    )}
                </ul>
                <TodoInput />
                <button onClick={() => this.addLots(100)}>Add 100</button>
                <button onClick={() => this.store.clear()}>Clear</button>
            </div>
        );
    }

    addLots(count: number) {
        const functionName = this.addLots.name;

        console.time(`${functionName}(): compute time`);

        for (let i = 0; i < count; i++) {
            this.store.add(i.toString());
        }

        console.timeEnd(`${functionName}(): compute time`);

        console.time(`${functionName}(): render time`);

        window["requestIdleCallback"](() => console.timeEnd(`${functionName}(): render time`));
    }
}