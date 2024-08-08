/** @odoo-module **/

import {registry} from "@web/core/registry";
import {Component, useState, onWillStart, useRef} from "@odoo/owl";

class IcaMovieAction extends Component {

    setup() {
        this.nameRef = useRef('name');
        this.state = useState({
            partners: [],
            partner: {name: "", email: "", phone: ""},
            activeId: null
        })
        this.resModel = 'res.partner';
        this.orm = this.env.services.orm;
        onWillStart(async () => {
            await this.getAllPartners();
        })
    }

    async searchPartners(e) {
        if (e.type === 'click' || e.keyCode === 13) {
            let name = this.nameRef.el.value.trim();
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
        await this.orm.unlink(this.resModel, [newPartner.id]);
        this.state.partners = this.state.partners.filter(partner => partner.id !== newPartner.id);
    }

    async updatePartner(newPartner) {
        this.state.partner = newPartner;
        this.state.activeId = newPartner.id;
    }

    async savePartner() {
        if (this.state.activeId) {
            await this.orm.write(this.resModel, [this.state.activeId], this.state.partner);
            this.state.activeId = false;
        } else {
            var newPartner = await this.orm.create(this.resModel, [this.state.partner]);
            this.state.partners.push({...this.state.partner, id: newPartner[0]});
        }
        this.state.partner = {};
    }

}

IcaMovieAction.template = "ica_movie.icaMovie";

// remember the tag name we put in the first step
registry.category("actions").add("ica_movie.movieAction", IcaMovieAction);