
#? ------------------------------ I N S T A L A C I O N E S ---------------------------
    # pip install flask  
    # pip install flask-mysqldb 
    # pip install -U flask-cors

'''------------------------------------ I M P O R T S --------------------------------'''
from flask import Flask 
from flask import render_template   # para usar html 
from flask import request           # Para enviar y recibir datos
from flask import redirect          # Para redireccionar
from flask import url_for           # crear una URL para redireccionar
from flask import jsonify           # Objeto Json
from flask import request           # manejar los request
from flask_cors import CORS         # Importando CORS para python
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

'''---------------------------- Coneccion a la base de datos ----------------------------'''
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'seriesApp'
mysql = MySQL(app)

# Settings
app.secret_key = 'mysecretkey' # para que vaya protegida la sesion

'''----------------------------------------- R U T A S --------------------------------'''

#! Obtener todos los datos de la columna series
@app.route('/', methods=['GET'])
def getData():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM series') 
    status_code = 200
    data = cur.fetchall() # ejecuta la consulta y obtiene todos los datos
    dataSeries = []
    for serie in data:
        Objetoserie = {
            "id": serie[0],
            "nombre": serie[1],
            "valoracion": serie[2],
            "temporadas": serie[3],
            "urlImg": serie[4]
        }
        dataSeries.append(Objetoserie)
    
    return jsonify(dataSeries),status_code

#! Agregar serie
@app.route('/agregarSerie', methods=['POST'])
def agregarSerie():
    if request.method == 'POST':
        nombre = request.json['nombre']
        valoracion = request.json['valoracion']
        temporadas = request.json['temporadas']
        urlImg = request.json['urlImg']
    
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO series (nombre,valoracion,temporadas,urlImg) VALUES(%s, %s, %s,%s)', (nombre,valoracion,temporadas,urlImg))
        mysql.connection.commit() # ejecutar la consulta
        status_code = 201
        
        return jsonify({"message": "producto agregado","status-code": status_code}),status_code

#! Actualizar serie
@app.route('/update/<id>', methods=['PUT'])
def update_serie(id):
    if request.method == 'PUT':
        nombre = request.json['nombre']
        valoracion = request.json['valoracion']
        temporadas = request.json['temporadas']
        urlImg = request.json['urlImg']
        cur = mysql.connection.cursor()
        cur.execute('UPDATE series SET nombre = %s, valoracion = %s, temporadas =%s, urlImg = %s WHERE id = %s',(nombre,valoracion,temporadas,urlImg,id))
        mysql.connection.commit() # ejecutar la consulta

        status_code = 200
        return jsonify({"message":"producto actualizado","status-code": status_code}),status_code

#! Eliminar Serie
@app.route('/delete/<string:id>', methods=['DELETE'])
def delete_serie(id):
    print(id)
    if request.method == 'DELETE':
        cur = mysql.connection.cursor()
        cur.execute(f'DELETE FROM series WHERE id = {id}')
        mysql.connection.commit() # ejecutar la consulta
        status_code = 200

        return jsonify({"message":"producto borrado","status-code": status_code}),status_code


#? ------------------------------------------------------------------------------------------



'''-----------------------------------Ejecutar Servidor --------------------------------'''
# python app.py
if __name__ == '__main__':
    app.run(port = 3000, debug=True) # debug true para reiniciar cambios automaticamente