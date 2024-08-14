from odoo import http


class MainController(http.Controller):
    @http.route('/rpc/login', type='json', auth='user')
    def rpc_login(self,username,password,**kw):
        print(kw)
        print(username,password)
        return {"message": "successfully"}
