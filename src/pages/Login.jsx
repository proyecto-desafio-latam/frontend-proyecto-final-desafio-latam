import React, { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import "../assets/css/Register.css";
import Navbar from "../components/Navbar";

export default function Login() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  return (
    <>
    <Navbar></Navbar>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          let validations = {};

          if (!values.email) {
            validations.email = "Por favor ingresa un correo válido";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            validations.email = "Por favor ingresa un correo válido";
          }

<<<<<<< HEAD

        <>
            <main className='main-content-container'>
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

                    onSubmit={async (values, { resetForm }) => {
                        resetForm();             // clean inputs
                        setLoginSuccess(true);  // change state for "Login exitoso"
                        console.log(loginSuccess);
                        setTimeout(() => setLoginSuccess(false), 4000); //hide "Login exitoso" after 4 sec"
                        console.log(values);
                    }}
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
                                <p>Aun no tienes cuenta? crea una aquí</p>
                            </div>

                            {loginSuccess && <p className="success-message">Login exitoso</p>}
                        </Form>
                    )}
                </Formik>
            </main>
        </>
    )
}
=======
          if (!values.password) {
            validations.password = "Por favor ingrese una contraseña";
          } else if (values.password.length < 6) {
            validations.password = "La contraseña es demasiado corta";
          }
          return validations;
        }}
        onSubmit={async (values, { resetForm }) => {
          resetForm(); // clean inputs
          setLoginSuccess(true); // change state for "Login exitoso"
          console.log(loginSuccess);
          setTimeout(() => setLoginSuccess(false), 4000); //hide "Login exitoso" after 4 sec"
          console.log(values);
        }}
      >
        {({ errors }) => (
        
          
          <Form className="register-form">
            <div className="form-field ">
              <label className="form-label" htmlFor="email">
                Correo
              </label>
              <Field
                className="form-input"
                type="text"
                id="email"
                name="email"
                placeholder="correo@correo.cl"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="form-error">{errors.email}</div>
                )}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <Field
                className="form-input"
                type="password"
                id="password"
                name="password"
                placeholder="*******"
              />
              <ErrorMessage
                className="form-error"
                name="password"
                component={() => (
                  <div className="form-error">{errors.password}</div>
                )}
              />
            </div>
            <div className="login-button-container">
              <button className="form-button-login" type="submit">
                Login
              </button>
              <p>Aun no tienes cuenta? crea una aquí</p>
            </div>

            {loginSuccess && <p className="success-message">Login exitoso</p>}
          </Form>
        )}
      </Formik>
    </>
  );
}
>>>>>>> main
