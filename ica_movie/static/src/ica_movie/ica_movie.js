/** @odoo-module **/

import {registry} from "@web/core/registry";
import {Component, useState, onWillStart, useRef} from "@odoo/owl";
import {ConfirmationDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import {Layout} from "@web/search/layout";
import {Notebook} from "@web/core/notebook/notebook";
import {useService} from "@web/core/utils/hooks";
import {cookie} from "@web/core/browser/cookie";


export default class IcaMovieAction extends Component {
    static template = "ica_movie.icaMovie";
    static components = {Layout, Notebook};

    setup() {
        this.nameRef = useRef('name');
        this.display = {
            controlPanel: {},
        }
        this.state = useState({
            partners: [],
            partner: {name: "", email: "", phone: ""},
            activeId: null,
            todos: [],
            darkTheme: false,
        })
        this.resModel = 'res.partner';
        this.orm = this.env.services.orm;
        this.dialog = this.env.services.dialog;
        this.effectService = this.env.services.effect;
        this.httpService = this.env.services.http;
        // this.cookieService = useService("cookie");
        onWillStart(async () => {
            await this.getAllPartners();
            this.changeTitle();
            // console.log(cookie.get('darkTheme'));
            this.state.darkTheme = cookie.get('darkTheme') === 'true';
        })
    }

    async searchPartners(e) {
        if (e.type === 'click' || e.keyCode === 13) {
            let name = this.nameRef.el.value.trim();
            await this.getAllPartners(name);
            this.nameRef.el.value = null;
            return null;
        }

    }

    async getAllPartners(name) {
        const domain = [['name', 'ilike', name]];
        const fields = ['id', 'name', 'email', 'phone'];
        this.state.partners = await this.orm.searchRead(this.resModel, domain, fields, {order: "id desc"});
    }

    deletePartner(newPartner) {
        this.dialog.add(ConfirmationDialog, {
                title: "Delete",
                body: `Are you sure to delete ${newPartner.name}?`,
                confirm: async () => {
                    await this.orm.unlink(this.resModel, [newPartner.id]);
                    this.state.partners = this.state.partners.filter(partner => partner.id !== newPartner.id);

                    //     effect
                    this.effectService.add({
                        type: "rainbow_man",
                        message: "Record Delete Successfully."
                    })
                },
                cancel: () => {
                },
            },
            {
                onClose: () => {
                    console.log("Helllo on Close.")
                }
            });
    }

    async updatePartner(newPartner) {
        this.state.partner = newPartner;
        this.state.activeId = newPartner.id;
    }

    async savePartner() {
        if (this.state.activeId) {
            await this.orm.write(this.resModel, [this.state.activeId],
                this.state.partner);
            this.state.activeId = false;
            this.notificationService = this.env.services.notification;
            this.notificationService.add("I'm a very simple notification", {
                title: "Title",
                type: "danger",
                sticky: true,
                className: "p-4",
                buttons: [
                    {
                        name: "Sample Button",
                        onClick: () => {
                            console.log("button click")
                        },
                        primary: true
                    },
                    {
                        name: "Sample Button 2",
                        onClick: () => {
                            console.log("button click")
                        },
                        primary: false
                    }
                ]
            });
        } else {
            var newPartner = await this.orm.create(this.resModel,
                [this.state.partner]);
            this.state.partners.push({
                ...this.state.partner,
                id: newPartner[0]
            });
        }
        this.state.partner = {};
    }

    async getTodoList() {
        const endPoint = 'https://jsonplaceholder.typicode.com/todos';
        var todos = await this.httpService.get(endPoint);
        console.log(todos);
        this.state.todos = todos;
    }

    changeTitle() {
        this.titleService = this.env.services.title;
        // console.log("Hello")
        this.titleService.setParts({
            // odoo: "AA",
            // fruit: "BB",
            zopenerp: "Change Action"
        });
        // console.log(this.titleService.current);
    }

    switchTheme() {
        if (cookie.get("darkTheme") === 'false') {
            cookie.set("darkTheme", true);
        } else {
            cookie.set("darkTheme", false);
        }
        this.state.darkTheme = cookie.get('darkTheme') === 'true';
    }
}


// IcaMovieAction.template = "ica_movie.icaMovie";
// IcaMovieAction.components = {Layout,};

// remember the tag name we put in the first step
registry.category("actions").add("ica_movie.movieAction", IcaMovieAction);