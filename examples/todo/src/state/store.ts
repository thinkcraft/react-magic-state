export interface TodoItem {
    id: number;
    text: string;
    done: boolean;
}

export class Store {
    todos = new Array<TodoItem>();
    lastId = 0;

    add(text: string) {
        this.todos.push({
            id: ++this.lastId,
            text,
            done: false
        });
    }

    clear() {
        this.todos = [];
    }

    remove(id: number) {
        const index = this.todos.findIndex(t => t.id === id);

        this.todos.splice(index, 1);
    }

    toggle(id: number) {
        const todo = this.todos.find(t => t.id === id);

        if (todo) {
            todo.done = !todo.done;
        }            
    }
}