/** @odoo-module */
import { Component } from "@odoo/owl";
import {Customers} from "./components/customers/customers";
import {Navbar} from "./components/navbar/navbar";

export class Root extends Component {
    static template = "ica_movie.Root";
    static components = {Customers,Navbar};
    static props = {};
}