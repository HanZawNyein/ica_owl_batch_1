/** @odoo-module **/

import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";
import {Component, useState,onWillStart} from "@odoo/owl";

class IcaMovieAction extends Component {
    setup() {
        this.state = useState({
            partners: [],
        })
        this.orm = useService('orm');
        onWillStart(async () => {
            await this.getAllPartners();
        })
    }

    async getAllPartners() {
        // console.log("search partner");
        this.state.partners = await this.orm.searchRead('res.partner', [], ['id', 'name']);
        // console.log(partners);
        //  = partners;
    }


}

IcaMovieAction.template = "ica_movie.icaMovie";

// remember the tag name we put in the first step
registry.category("actions").add("ica_movie.movieAction", IcaMovieAction);