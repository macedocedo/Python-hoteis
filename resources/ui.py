from flask import render_template, make_response
from flask_restful import Resource

headers = {'Content-Type': 'text/html'}

class RenderUI(Resource):
    def get(self):
        return make_response(render_template('index.html'), headers)