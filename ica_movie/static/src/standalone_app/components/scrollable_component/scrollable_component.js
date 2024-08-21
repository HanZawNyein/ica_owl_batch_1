/** @odoo-module */
import {Component, onWillStart, useState} from "@odoo/owl";

export class ScrollableComponent extends Component {
    static template = "ica_movie.ScrollableComponent";
    static props = {};
    static defaultProps = {
        class: "m-5 bg-white",
    };

    // setup(){
    //     console.log(this.props)
    // }
}