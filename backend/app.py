
#? ------------------------------ I N S T A L A C I O N E S ---------------------------
    # pip install flask
    # pip install flask-mysqldb
    # pip install -U flask-cors
    # pip install bcrypt
    # pip install Flask-JWT | https://pythonhosted.org/Flask-JWT/

'''------------------------------------ I M P O R T S --------------------------------'''
from flask import Flask
from flask import jsonify           # Objeto Json
from flask import request           # manejar los request
from flask_cors import CORS         # Importando CORS para python
from flask_mysqldb import MySQL     # mysql y flask
import bcrypt                       # hash a password
# from flask_jwt import JWT, jwt_required, current_identity
# from werkzeug.security import safe_str_cmp


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

#! Registro
@app.route('/registro', methods=['POST'])
def registro():
    if request.method == 'POST':
        usuario = request.json['usuario']
        contraseña = request.json['contrasena']
        contraseña_cifrada = bcrypt.hashpw(contraseña.encode('utf-8'), bcrypt.gensalt())
        urlfoto = ''

    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO usuarios (usuario,contrasena,fotoperfil) VALUES(%s, %s, %s)',(usuario,contraseña_cifrada,urlfoto))
    mysql.connection.commit() # ejecutar la consulta
    status_code = 201

    return jsonify({"message": "usuario creado","status-code": status_code}),status_code

#! Login
@app.route('/login/<nameUsuario>',methods=['POST'])
def login(nameUsuario):
    if request.method == 'POST':
        contraseñaRequest = request.json['contrasena'].encode('utf-8')

        cur = mysql.connection.cursor()
        cur.execute("""SELECT * FROM USUARIOS WHERE USUARIO = %s""", (nameUsuario,))
        user = cur.fetchone()
        cur.close()
        contraseñaUser = user[2].encode('utf-8')
        if (user != None):
            if (bcrypt.checkpw(contraseñaRequest,contraseñaUser)):
                status_code = 202
                usuario = {
                    "id": user[0],
                    "usuario": user[1],
                    "fotourl": user[3],
                }
                return jsonify(usuario),status_code
            else:
                status_code = 401
                respuesta = {
                    "contraseña": False,
                    "mensaje": 'contraseña incorrecta'
                }
                return jsonify(respuesta),status_code
        else:
            status_code = 404
            respuesta = {
                "usuario": False,
                "mensaje": 'Usuario incorrecto'
            }
            return jsonify(respuesta),status_code

#! Actualizar usuario
@app.route('/updateUser/<id>', methods=['PUT'])
def update_user(id):
    cur = mysql.connection.cursor()
    # print(request.headers['token'])
    if request.method == 'PUT':
        print(request.json)
        fotourl = request.json['fotourl']
        contraseña = request.json['contrasena']
        if(contraseña):
            contraseña_cifrada = bcrypt.hashpw(contraseña.encode('utf-8'), bcrypt.gensalt())

        if(contraseña != '' and fotourl != ''):
            cur.execute("""UPDATE usuarios SET contrasena = %s, fotoperfil = %s WHERE id = %s""",(contraseña_cifrada,fotourl,id))
        elif (contraseña != '' ):
            cur.execute("""UPDATE usuarios SET contrasena = %s WHERE id = %s""",(contraseña_cifrada,id))
        elif (fotourl != '' ):
            cur.execute("""UPDATE usuarios SET fotoperfil = %s WHERE id = %s""",(fotourl,id))

        cur = mysql.connection.cursor()
        mysql.connection.commit() # ejecutar la consulta

        status_code = 200
        return jsonify({"message":"usuario actualizado","status-code": status_code}),status_code

#-------------------------------------------------------------------------------------------------------

#! Obtener series del usuario
@app.route('/<id>', methods=['GET'])
def getSerieUsuario(id):
    cur = mysql.connection.cursor()
    cur.execute(f'SELECT * FROM series WHERE idUsuario = {id}')
    status_code = 200
    data = cur.fetchall() # ejecuta la consulta y obtiene todos los datos
    dataSeries = []
    for serie in data:
        Objetoserie = {
            "id": serie[0],
            "nombre": serie[1],
            "valoracion": serie[2],
            "temporadas": serie[3],
            "urlImg": serie[4],
            "urlSerie": serie[5],
            "idUsuario": serie[6]
        }
        dataSeries.append(Objetoserie)

    return jsonify(dataSeries),status_code

#! Agregar serie
@app.route('/agregarSerie', methods=['POST'])
def agregarSerie():
    if request.method == 'POST':
        idUsuario = request.json['id']
        nombre = request.json['nombre']
        valoracion = request.json['valoracion']
        temporadas = request.json['temporadas']
        urlImg = request.json['urlImg']
        urlSerie = request.json['urlSerie']

        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO series (nombre,valoracion,temporadas,urlImg,urlSerie,idUsuario) VALUES(%s, %s, %s,%s,%s,%s)', (nombre,valoracion,temporadas,urlImg,urlSerie,idUsuario))
        mysql.connection.commit() # ejecutar la consulta
        status_code = 201

        return jsonify({"message": "Serie Agregada","status-code": status_code}),status_code

#! Actualizar serie
@app.route('/update/<id>', methods=['PUT'])
def update_serie(id):
    if request.method == 'PUT':
        nombre = request.json['nombre']
        valoracion = request.json['valoracion']
        temporadas = request.json['temporadas']
        urlImg = request.json['urlImg']
        urlSerie = request.json['urlSerie']
        cur = mysql.connection.cursor()
        cur.execute('UPDATE series SET nombre = %s, valoracion = %s, temporadas =%s, urlImg = %s, urlSerie =%s WHERE id = %s',(nombre,valoracion,temporadas,urlImg,urlSerie,id))
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