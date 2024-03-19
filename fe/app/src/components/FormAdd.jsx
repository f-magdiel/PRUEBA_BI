import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';

const FormAdd = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/adduser', {
      'nombre': nombre,
      'apellido': apellido,
      'correo':correo,
      'telefono':telefono
    })
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          alert('Usuario agregado correctamente');
          setNombre('');
          setApellido('');
          setCorreo('');
          setTelefono('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card style={{ width: '18rem', float: 'left', marginLeft:'100px' }}>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="correo">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Agregar Usuario
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormAdd;
