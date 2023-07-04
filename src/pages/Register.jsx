import React, { useState } from 'react';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repetirContrasena, setRepetirContrasena] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const handleSubmit = async (event) => {

        // const fechaFormateada = new Date(fechaNacimiento).toLocaleDateString('es-ES', {
        //     day: '2-digit',
        //     month: 'long',
        //     year: 'numeric',
        // });

        event.preventDefault();
        // Mostrar los valores en la consola


        console.log('Valores del formulario:');
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Nombre de usuario:', username);
        console.log('Correo:', correo);
        console.log('Contraseña:', contrasena);
        console.log('Repita contraseña:', repetirContrasena);
        console.log('Fecha de nacimiento:', fechaNacimiento);

        // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor
        console.log('Formulario enviado');


        // Construir el objeto de datos a enviar
        const data = {
            nombre,
            apellido,
            username,
            correo,
            contrasena,
            repetirContrasena,
            fechaNacimiento,
        };

        try {
            // Enviar la solicitud POST al backend
            const response = await fetch('/ruta-del-backend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            // Aquí puedes realizar acciones adicionales después de enviar los datos

        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Aquí puedes manejar el error de acuerdo a tus necesidades
        }
    };

    const handleLimpiar = () => {
        setNombre('');
        setApellido('');
        setUsername('');
        setCorreo('');
        setContrasena('');
        setRepetirContrasena('');
        setFechaNacimiento('');
    };

    return (
        <div id="container-login">
            <form onSubmit={handleSubmit}>
                <p>Nombre:</p>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <p>Apellido:</p>
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                <p>Nombre de usuario:</p>
                <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>Correo:</p>
                <input type="email" placeholder="correo@correito.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <p>Contraseña:</p>
                <input type="password" placeholder="******" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <br />
                <p>Repita contraseña:</p>
                <input type="password" placeholder="******" value={repetirContrasena} onChange={(e) => setRepetirContrasena(e.target.value)} />
                <p>Fecha de nacimiento:</p>
                <input type="date" placeholder="" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                <br />
                <div>
                    <button type="button" onClick={handleLimpiar}>Limpiar</button>
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}