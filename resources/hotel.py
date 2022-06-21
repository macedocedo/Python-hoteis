
from flask_restful import Resource, reqparse
from models.hotel import HotelModel
import time

class Hoteis(Resource):
    def get(self):
        return {'hoteis': [hotel.json() for hotel in HotelModel.query.all()]}


class Hotel(Resource):
    
    argumentos = reqparse.RequestParser()
    argumentos.add_argument('nome', type=str, required=True, help="The field 'name' is obligatory."), 400  #
    argumentos.add_argument('estrelas', type=float, required=True, help="The field 'estrelas' is obligatory.")
    argumentos.add_argument('diaria', type=float, required=True, help="The field 'diaria' is obligatory.")
    argumentos.add_argument('cidade', type=str, required=True, help="The field 'cidade' is obligatory.")

    
    def get(self, hotel_id): 
        
        hotel = HotelModel.find_hotel(hotel_id)
        if hotel:
            return hotel.json()
        return {'message': 'Hotel not found.'}, 400

    # def post(self, hotel_id):
    #     if HotelModel.find_hotel(hotel_id):
    #         return {"message": "Hotel id '{}' already exists." .format(hotel_id)},  #400bad request
            
    #     dados = Hotel.argumentos.parse_args()
    #     if dados.get('nome').strip() == '' :
    #         return{'messagem': 'Os campos nao podem ficar em branco.'}
    #     hotel = HotelModel(hotel_id, **dados)
    #     try:
    #         hotel.save_hotel()
    #     except:
    #         return{'message': 'Error'} , 500 #internel serve
    #     return hotel.json()

    def post(self, hotel_id):
        dados = Hotel.argumentos.parse_args()

        hotel = HotelModel(time.time(), **dados)

        try:
            hotel.save_hotel()
        except:
            return{'message': 'Error'} , 500 #internel serve
        return hotel.json()

    def put(self,hotel_id):
        dados = Hotel.argumentos.parse_args()
        hotel_localizado = HotelModel.find_hotel(hotel_id)
        if hotel_localizado:
            hotel_localizado.update_hotel(**dados)
            hotel_localizado.save_hotel()                  
            return hotel_localizado.json(), 200
        hotel = HotelModel(hotel_id, **dados)
        try:    
            hotel.save_hotel()
        except:
            return{'message': 'Error'} , 500 #internel server error 
        return hotel.json(),201 #created hotel


    def delete(self, hotel_id):
        hotel = HotelModel.find_hotel(hotel_id)
        if hotel:
            try:
                hotel.delete_hotel()
            except:
                return{'message': 'An error ocurred trying to delete hotel.'}, 500    
            return {'message': 'Hotel deletado.'}, 200
        return {'message': 'Hotel not found.'}, 404