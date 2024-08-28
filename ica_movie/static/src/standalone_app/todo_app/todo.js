/** @odoo-module */
import { reactive,useState, useEnv } from "@odoo/owl";

class Todo {
    nextId = 1;
    todos = [
        {'id': 1, 'name': 'hello'},
        {'id': 2, 'name': 'hello 2'}
    ]

    // UserError(_('Hello'))

    addTask(todo){
        todo['id'] = this.nextId++;
        // console.log(todo);
        this.todos.push(todo);
        // console.log(this.todos.length)
    }

    deleteTask(id){
        // console.log(id)
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }
}

export function createTodoStore() {
    return reactive(new Todo());
}

export function useStore() {
    const env = useEnv();
    return useState(env.store);
}