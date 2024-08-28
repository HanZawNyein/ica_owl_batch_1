/** @odoo-module */
import {Component, useState, onWillStart, useSubEnv, useChildSubEnv, useEnv} from "@odoo/owl";
import {Navbar} from "./components/navbar/navbar";
import {registry} from "@web/core/registry";
import {createTodoStore, useStore} from "./todo_app/todo";


export class Root extends Component {
    static template = "ica_movie.Root";
    static components = {Navbar};
    static props = {};

    setup() {
        this.state = useState({
            mainScreen: 'todo_list',
        })
        // <= 30
        useSubEnv({
            switchScreen: this.switchScreen.bind(this),
            store: createTodoStore()
        })
    }

    switchScreen(name) {
        // console.log("Hello I am from root  of switch screen")
        // console.log(name)
        this.state.mainScreen = name;
    }

    getComponent() {
        // return Customers;
        let mainScreen = this.state.mainScreen
        return registry.category('ica.movie').get(mainScreen);
        // return this.state.mainScreen === 'saleOrderScreen' ? Customers : SaleOrders;
    }
}