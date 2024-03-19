from flask import Blueprint, request, jsonify
from db import obtener_db, cerrar_db

usuarios = Blueprint('usuarios', __name__)

@usuarios.route('/adduser', methods=['POST'])
def add_user():
    data = request.get_json()
    
    try:
        db = obtener_db()
        cursor = db.cursor()
        query = 'INSERT INTO usuarios (nombre, apellido,correo,telefono) VALUES (%s, %s,%s,%s)'
        cursor.execute(query, (data['nombre'], data['apellido'], data['correo'], data['telefono']))
        db.commit()
        cursor.close()
        cerrar_db(None)
        return jsonify({
            "status":200,
            "message": "Agregado correctamente a la base de datos"
        })
    except Exception as e:
        return jsonify({
            'status': 500,
            'mensaje': 'Error al eliminar el usuario'
            })

@usuarios.route('/delete/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        conn = obtener_db()
        cursor = conn.cursor()
        query = "DELETE FROM Usuarios WHERE id = %s"
        cursor.execute(query, (id,))
        conn.commit()
        conn.close()
        return jsonify(
            {
                'status': 200,
                'mensaje': 'Usuario eliminado correctamente'}
            )
    except Exception as e:
        return jsonify({
            'status': 500,
            'mensaje': 'Error al eliminar el usuario'
            })

@usuarios.route('/update/<int:id>', methods=['PUT'])
def editar_usuario(id):
    data = request.get_json()
    
    try:
        conn = obtener_db()
        cursor = conn.cursor()
        # Realiza la consulta para actualizar los datos del usuario con el ID especificado
        query = "UPDATE Usuarios SET nombre = %s, apellido = %s, correo = %s, telefono = %s WHERE id = %s"
        cursor.execute(query, (data['nombre'], data['apellido'], data['correo'], data['telefono'], id))
        conn.commit()
        conn.close()

        return jsonify({
            'status':200,
            'mensaje': 'Usuario actualizado correctamente'
            })
    except Exception as e:
        return jsonify({
            'status': 500,
            'mensaje': 'Error al editar el usuario'
            })
    
@usuarios.route('/obtener_usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        conn = obtener_db()
        cursor = conn.cursor()
        query = "SELECT * FROM Usuarios"
        cursor.execute(query)
        usuarios = cursor.fetchall()
        conn.close()
        return jsonify({
            'status': 200,
            'usuarios': usuarios
            })
    except Exception as e:
        return jsonify({
            'status': 500,
            'mensaje': 'Error al obtener los usuarios'
            })






