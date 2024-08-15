/** @odoo-module **/

// new file.js
import {registry} from "@web/core/registry";
import IcaMovieAction from "./ica_movie";
import {patch} from "@web/core/utils/patch";
import { onWillRender,
    onWillStart,
    onRendered,
    onMounted,
    onWillDestroy } from "@odoo/owl";

patch(IcaMovieAction.prototype, {
    setup(){
        super.setup(...arguments);
        onWillStart(()=>{
            console.log("onWillStart")
        });
        onWillRender(()=>{
            console.log("onWillRender")
        });
        onRendered(()=>{
            console.log("onRendered")
        });
        onMounted(()=>{
            console.log("onMounted")
        })
        onWillDestroy(()=>{
            console.log("onWillDestroy")
        })
    },
    async callOrmMethod(partner) {
        onWillDestroy(()=>{
            console.log("onWillDestroy")
        })
        // console.log(partner)
        await this.orm.call(this.resModel, "action_class_from_json", [[partner.id]], {
            name: partner.name,
            email: partner.email,
        });
    },

    async callingRPCService() {
        console.log("click")

        await this.rpcService("/rpc/login", {
            username: "username",
            password: "admin"
        });
    },

    async searchPartners() {
        var result = super.searchPartners(...arguments);
        if (result === null) {
            console.log("Hell Search partners Method Extension.")
        }
    }
})
