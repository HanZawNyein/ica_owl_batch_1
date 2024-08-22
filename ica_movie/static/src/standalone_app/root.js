/** @odoo-module */
import {Component, useState, onWillStart} from "@odoo/owl";
import {Customers} from "./components/customers/customers";
import {Navbar} from "./components/navbar/navbar";
import {SaleOrders} from "./components/sale_orders/sale_orders";
import {registry} from "@web/core/registry";
import {loadBundle, loadCSS, loadJS} from "@web/core/assets";


export class Root extends Component {
    static template = "ica_movie.Root";
    static components = {Customers, Navbar, SaleOrders};
    static props = {};

    setup() {
        this.state = useState({
            mainScreen: 'saleOrderScreen',
        })

        onWillStart(async () => {
            console.log("Hello onWillStart.")
            // await loadBundle('ica_movie.custom_assets')
            // await loadCSS("https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css");
            // await loadJS("https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.js");
        });
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