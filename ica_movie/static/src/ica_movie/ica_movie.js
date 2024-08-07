/** @odoo-module **/

import {registry} from "@web/core/registry";
import {Component, useState, onWillStart, useRef} from "@odoo/owl";

class IcaMovieAction extends Component {

    setup() {
        this.nameRef = useRef('name');
        this.state = useState({
            partners: [],
        })
        this.resModel = 'res.partner';
        this.orm = this.env.services.orm;
        onWillStart(async () => {
            await this.getAllPartners();
        })
    }

    async searchPartners(e) {
        if (e.type === 'click' || e.keyCode === 13) {
            let name = this.nameRef.el.value;
            await this.getAllPartners(name);
            this.nameRef.el.value = null;
        }
    }

    async getAllPartners(name) {
        const domain = [['name', 'ilike', name]];
        const fields = ['id', 'name', 'email', 'phone'];
        this.state.partners = await this.orm.searchRead(this.resModel, domain, fields);
    }

    async deletePartner(newPartner) {
        await this.orm.write(this.resModel, [newPartner.id], {active: false});
        this.state.partners = this.state.partners.filter(partner => partner.id !== newPartner.id);
    }

    async updatePartner(newPartner) {
        console.log(newPartner);
    }

}

IcaMovieAction.template = "ica_movie.icaMovie";

// remember the tag name we put in the first step
registry.category("actions").add("ica_movie.movieAction", IcaMovieAction);