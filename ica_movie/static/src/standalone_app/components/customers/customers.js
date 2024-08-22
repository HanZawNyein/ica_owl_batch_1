/** @odoo-module */
import {Component, onWillStart, useState} from "@odoo/owl";
import {CustomerList} from "../customer_list/customer_list";
import {ScrollableComponent} from "../scrollable_component/scrollable_component";
import {ListViewComponent} from "../list_view/list_view";
import {GridViewComponent} from "../grid_view/grid_view";
import { registry } from "@web/core/registry";

const VIEW = {
    listView: "list",
    gridView: "grid",
}

export class Customers extends Component {
    static template = "ica_movie.Customers";
    static props = {};
    static components = {ListViewComponent, GridViewComponent};

    setup() {
        this.state = useState({
            view: VIEW.listView,
            partners: []
        })
        this.model = "res.partner";
        this.orm = this.env.services.orm;

        onWillStart(async () => {
            await this.getAllPartners();
        })
    }

    switchView() {
        this.state.view = this.state.view === VIEW.listView ? VIEW.gridView : VIEW.listView;
    }

    getComponent() {
        return this.state.view === VIEW.listView ? GridViewComponent : ListViewComponent;
    }

    async getAllPartners() {
        this.state.partners = await this.orm.searchRead(this.model, [], ['name', 'email']);
        this.state.partners = this.state.partners.map(partner => {
            return {...partner, imageURL: `/web/image/${this.model}/${partner.id}/avatar_128`}
            // return {email:partner.email,name:partner.name, imageURL: `/web/image/${this.model}/${partner.id}/avatar_128`}
        })
    }
}

registry.category('ica.movie').add('customerScreen',Customers)