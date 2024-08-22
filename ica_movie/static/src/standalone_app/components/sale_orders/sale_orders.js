/** @odoo-module */
import {Component, onWillStart, useState} from "@odoo/owl";
import {Customers} from "../customers/customers";
import { registry } from "@web/core/registry";

export class SaleOrders extends Component {
    static template = "ica_movie.SaleOrders";
    static props = {};
}
registry.category('ica.movie').add('saleOrderScreen',SaleOrders)