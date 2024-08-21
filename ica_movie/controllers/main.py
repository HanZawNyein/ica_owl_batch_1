from odoo import http
from odoo.http import request


class MainController(http.Controller):
    @http.route('/rpc/login', type='json', auth='user')
    def rpc_login(self, username, password, **kw):
        print(kw)
        print(username, password)
        return {"message": "successfully"}

    @http.route('/ica/send-bus', type='json', auth='user')
    def send_bus(self, **kw):
        print(kw)
        request.env['bus.bus']._sendone(
            'ica-movie-channel',
            'ica-movie-channel/sending-message', kw)
        return True

    @http.route("/ica-movie/standalone_app", auth="public")
    def standalone_app(self):
        return request.render(
            'ica_movie.standalone_app',
            {
                'session_info': request.env['ir.http'].get_frontend_session_info(),
            }
        )
