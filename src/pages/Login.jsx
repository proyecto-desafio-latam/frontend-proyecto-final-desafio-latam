import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const {saveToken} = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          if (response.ok) {
            const data = await response.json()
            console.log(data)
            saveToken(data)
            resetForm();
            setLoginSuccess(true);
            setMessage(`Login exitoso`);
            setTimeout(() => setLoginSuccess(false), 4000);
            navigate("/")
          } else {
            setMessage(`Email y/o contraseña incorrecta`);
            setLoginSuccess(false);
          }
        } catch (error) {
          console.log("Error en la solicitud:", error);
        }
      };

    return (

        <>
            <div className='container mt-5 pt-5 pb-5 mb-5'>
                <h2 className="text-center pt-5 pb-4">Ingresa a tu cuenta:</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}

                    validate={(values) => {
                        let validations = {}

                        if (!values.email) {
                            validations.email = 'Por favor ingresa un correo válido';
                        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                            validations.email = 'Por favor ingresa un correo válido';
                        }

                        if (!values.password) {
                            validations.password = 'Por favor ingrese una contraseña';
                        } else if (values.password.length < 6) {
                            validations.password = 'La contraseña es demasiado corta';
                        }
                        return validations;
                    }}

                    onSubmit={handleSubmit}
                >
                    {({ errors }) => (
                        <Form className='register-form'>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="email">Correo</label>
                                <Field
                                    className="form-input"
                                    type="text"
                                    id='email'
                                    name='email'
                                    placeholder='correo@correo.cl'
                                />
                                <ErrorMessage name='email' component={() => (
                                    <div className='form-error'>{errors.email}</div>
                                )} />

                            </div>
                            <div className='form-field'>
                                <label className='form-label' htmlFor="password">Contraseña</label>
                                <Field
                                    className="form-input"
                                    type="password"
                                    id='password'
                                    name='password'
                                    placeholder='*******'
                                />
                                <ErrorMessage className='form-error' name='password'
                                    component={() => (
                                        <div className='form-error'>{errors.password}</div>
                                    )} />

                            </div>
                            <div className='login-button-container'>
                                <button className='form-button-login' type="submit">Login</button>
                                <p>Aun no tienes cuenta? <Link to="/register">crea una aquí</Link></p>
                            </div>

                            {message &&
                            <div className={(loginSuccess ? "alert alert-success mt-3" : "alert alert-danger mt-3")}>
                                {`${message}`}
                            </div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}