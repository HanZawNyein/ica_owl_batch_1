{
    "name": "ICA  Movie",
    "depends": ["base", "web", "mail"],
    "license": "LGPL-3",
    "data": [
        "views/ica_movie_client_action.xml",
        "views/template.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "/ica_movie/static/src/ica_movie/*",
        ],
        'ica_movie.assets_standalone_app': [
            ('include', 'web._assets_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_bootstrap'),
            ('include', 'web._assets_core'),
            'web/static/src/libs/fontawesome/css/font-awesome.css',
            'web/static/lib/odoo_ui_icons/*',
            'ica_movie/static/src/standalone_app/**/*.js',
            'ica_movie/static/src/standalone_app/**/*.xml',
            # 'ica_movie/static/src/standalone_app/**/*.scss',
        ],
        "ica_movie.custom_assets": [
            'ica_movie/static/src/standalone_app/**/*.scss',
        ],
    }
}
