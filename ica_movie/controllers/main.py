from odoo import http
from odoo.http import request
import odoo


class MainController(http.Controller):
    @http.route('/rpc/login', type='json', auth='user')
    def rpc_login(self, username, password, **kw):
        print(kw)
        print(username, password)
        return {"message": "successfully"}

    @http.route('/ica/send-bus', type='json', auth='user')
    def send_bus(self, **kw):
        request.env['bus.bus']._sendone(
            'ica-movie-channel',
            'ica-movie-channel/sending-message', kw)
        return True

    @http.route("/ica-movie/standalone_app", auth="public")
    def standalone_app(self, **kw):
        # get_frontend_session_info: dict = request.env['ir.http'].get_frontend_session_info()
        data = {
            'session_info': {'user_context': {'lang': 'my_MM', }},
        }
        return request.render(
            'ica_movie.standalone_app', data
        )
