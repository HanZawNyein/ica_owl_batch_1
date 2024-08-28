/** @odoo-module */
import {whenReady} from "@odoo/owl";
import {mountComponent} from "@web/env";
import {Root} from "./root";
// import {createTodoStore} from "./todo_app/todo";

whenReady(() => mountComponent(Root, document.body));