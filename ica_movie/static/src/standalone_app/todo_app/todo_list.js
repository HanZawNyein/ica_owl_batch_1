/** @odoo-module */
import {Component, useState, onWillStart, useSubEnv,useChildSubEnv} from "@odoo/owl";
import {registry} from "@web/core/registry";
import { useAutofocus, useService } from "@web/core/utils/hooks";
import {useStore} from "./todo";


export class TodoList extends Component {
    static template = "ica_movie.TodoList";
    static components = {};
    static props = {};

    setup(){
        this.inputRef = useAutofocus({refName:'title'});
        this.store = useStore()
    }

    addTask(){
        this.store.addTask({'name':this.inputRef.el.value})
    }
}

registry.category('ica.movie').add('todo_list', TodoList)