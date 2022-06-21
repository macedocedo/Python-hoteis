from flask import Flask, render_template, make_response
from flask_restful import  Api
from resources.hotel import Hoteis,  Hotel
from flask_cors import CORS
from resources.ui import RenderUI

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        variable_start_string='%%',
        variable_end_string='%%',
    ))


app = CustomFlask(__name__,
                  template_folder="./client",
                  static_folder="./client")

CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api =  Api(app)

@app.before_first_request
def cria_banco():
    banco.create_all()


api.add_resource(Hoteis, '/hoteis')
api.add_resource(Hotel, '/hotel/<string:hotel_id>')
api.add_resource(RenderUI, '/')

# @app.route('/test')
# def post():
#    return make_response(render_template('index.html'), headers)


if __name__=='__main__':
    from sql_alchemy import banco
    banco.init_app(app)
    app.run(debug=True)