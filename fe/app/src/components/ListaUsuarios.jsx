import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editUsuario, setEditUsuario] = useState({ id: null, nombre: '', apellido: '', correo: '', telefono: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/obtener_usuarios')
      .then((response) => {
        console.log(response.data);
        if(response.status === 200) {
          const usuariosFormatted = response.data.usuarios.map((usuario) => ({
            id: usuario[0],
            nombre: usuario[1],
            apellido: usuario[2],
            correo: usuario[3],
            telefono: usuario[4]
          }));
          setUsuarios(usuariosFormatted);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // Simulando la obtención de datos de usuario del backend
  }, []);

  const handleEditar = (usuario) => {
    setEditUsuario(usuario);
    setShowEditarModal(true);
  };

  const handleEliminar = (id) => {
    // Lógica para eliminar usuario (puedes usar fetch o axios para hacer la solicitud al backend)
    // Actualiza la lista de usuarios después de eliminar
    axios.delete(`http://localhost:5000/api/delete/${id}`)
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          alert('Usuario eliminado correctamente');
          const newUsuarios = usuarios.filter(usuario => usuario.id !== id);
          setUsuarios(newUsuarios);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    
  };

  const handleGuardarEdicion = () => {
    // Lógica para guardar los cambios editados del usuario (puedes usar fetch o axios para hacer la solicitud al backend)
    // Actualiza la lista de usuarios después de guardar la edición
    axios.put(`http://localhost:5000/api/update/${editUsuario.id}`, { 
      'nombre': editUsuario.nombre,
      'apellido': editUsuario.apellido,
      'correo': editUsuario.correo,
      'telefono': editUsuario.telefono
      })
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          alert('Usuario editado correctamente');
          const newUsuarios = usuarios.map(usuario => usuario.id === editUsuario.id ? editUsuario : usuario);
          setUsuarios(newUsuarios);
          setShowEditarModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditar(usuario)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleEliminar(usuario.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar usuario */}
      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={editUsuario.nombre} onChange={(e) => setEditUsuario({ ...editUsuario, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" value={editUsuario.apellido} onChange={(e) => setEditUsuario({ ...editUsuario, apellido: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="correo">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" value={editUsuario.correo} onChange={(e) => setEditUsuario({ ...editUsuario, correo: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" value={editUsuario.telefono} onChange={(e) => setEditUsuario({ ...editUsuario, telefono: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>Cerrar</Button>
          <Button variant="primary" onClick={handleGuardarEdicion}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaUsuarios;
