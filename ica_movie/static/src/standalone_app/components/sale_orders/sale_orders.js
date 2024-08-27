/** @odoo-module */
import {Component, onWillStart, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {_t} from "@web/core/l10n/translation";

export class SaleOrders extends Component {
    static template = "ica_movie.SaleOrders";
    static props = {};

    setup() {
        this.state = useState({
            translateText: _t("ICA"),
        })
    }

    getClick(){
        console.log("heloo");
    }
}

registry.category('ica.movie').add('saleOrderScreen', SaleOrders)