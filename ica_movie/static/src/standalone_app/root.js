/** @odoo-module */
import {Component, useState} from "@odoo/owl";
import {Customers} from "./components/customers/customers";
import {Navbar} from "./components/navbar/navbar";
import {SaleOrders} from "./components/sale_orders/sale_orders";
import {registry} from "@web/core/registry";


export class Root extends Component {
    static template = "ica_movie.Root";
    static components = {Customers, Navbar, SaleOrders};
    static props = {};

    setup() {
        this.state = useState({
            mainScreen: 'saleOrderScreen',
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