/** @odoo-module **/

// new file.js
import {registry} from "@web/core/registry";
import IcaMovieAction from "./ica_movie";
import {patch} from "@web/core/utils/patch";

patch(IcaMovieAction.prototype, {
    async callOrmMethod(partner) {
        // console.log(partner)
        await this.orm.call(this.resModel, "action_class_from_json", [[partner.id]], {
            name: partner.name,
            email: partner.email,
        });
    },

    async callingRPCService() {
        console.log("click")
        this.rpcService = this.env.services.rpc;
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
