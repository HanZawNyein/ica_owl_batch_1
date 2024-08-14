from odoo import api, fields, models


class Respartner(models.Model):
    _inherit = 'res.partner'

    def action_class_from_json(self,name,email):
        print("*" * 100)
        print(self)
        print(name,email)
