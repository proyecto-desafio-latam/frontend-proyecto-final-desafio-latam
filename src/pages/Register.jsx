import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import '../Register.css';

export default function Register() {

    const [submittedForm, setSubmittedForm] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    repeatPassword: '',
                    birthday: ''
                }}

                validate={(values) => {

                    let validations = {};

                    // Validación firstName
                    if (!values.firstName) {
                        validations.firstName = 'Por favor ingresa un nombre';
                    } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.firstName)) {
                        validations.firstName = 'El nombre solo puede contener letras';
                    } else if (values.firstName.length < 2) {
                        validations.firstName = 'Ingrese un nombre válido';
                    }


                    // Validación lastName
                    if (!values.lastName) {
                        validations.lastName = 'Por favor ingresa un apellido';
                    } else if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(values.lastName)) {
                        validations.lastName = 'El apellido solo puede contener letras';
                    } else if (values.lastName.length < 2) {
                        validations.lastName = 'Ingrese un apellido válido';
                    }


                    // Validación userName
                    if (!values.userName) {
                        validations.userName = 'Por favor ingresa un nombre de usuario válido';
                    } else if (!/^[a-zA-Z0-9.\-_]+$/.test(values.userName)) {
                        validations.userName = 'El nombre de usuario solo puede contener letras';
                    } else if (values.userName.length < 2) {
                        validations.userName = 'Ingrese un nombre de usuario válido';
                    }

                    // Validación email
                    if (!values.email) {
                        validations.email = 'Por favor ingresa un correo válido';
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                        validations.email = 'Por favor ingresa un correo válido';
                    }

                    // Password Validation
                    if (!values.password) {
                        validations.password = 'Por favor ingrese una contraseña';
                    } else if (values.password.length < 6) {
                        validations.password = 'La contraseña es demasiado corta';
                    }

                    // RepeatPassword Validation
                    if (!values.repeatPassword) {
                        validations.repeatPassword = 'Por favor repita la contraseña correctamente';
                    } else if (values.password !== values.repeatPassword) {
                        validations.repeatPassword = 'Las contraseñas no coinciden';
                    }

                    //Birthday Validation
                    const minAgeDate = new Date();
                    minAgeDate.setFullYear(minAgeDate.getFullYear() - 18);
                    const selectedDate = new Date(values.birthday);

                    if (selectedDate > minAgeDate) {
                        validations.birthday = 'Debes tener al menos 18 años';
                    }
                    return validations;
                }}

                onSubmit={async (values, { resetForm }) => {

                    try {
                        const response = await fetch('/api/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(values)

                        });

                        console.log(values)


                        if (response.ok) {
                            // If register is success

                            resetForm();             // clean inputs
                            setSubmittedForm(true);  // change state for "Registro exitoso"
                            setTimeout(() => setSubmittedForm(false), 4000); //hide "Registro exitoso after 4 sec"
                        } else {
                            // If is an error server
                            console.error('Error en el servidor:', response.status);
                        }
                    } catch (error) {
                        // Error in request
                        console.error('Error al enviar la solicitud:', error);
                    }
                }}
            >

                {({ errors }) => (
                    <Form className='register-form'>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="firstName">Nombre</label>
                            <Field
                                className="form-input"
                                type="text"
                                id='firstName'
                                name='firstName'
                                placeholder='Susan'
                            />
                            <ErrorMessage name='firstName' component={() => (
                                <div className='form-error'>{errors.firstName}</div>
                            )} />

                        </div>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="lastName">Apellido</label>
                            <Field
                                className="form-input"
                                type="text"
                                id='lastName'
                                name='lastName'
                                placeholder='Navarro'
                            />
                            <ErrorMessage className='form-error' name='lastName'
                                component={() => (
                                    <div className='form-error'>{errors.lastName}</div>
                                )} />

                        </div>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="name">Nombre de usuario</label>
                            <Field
                                className="form-input"
                                type="text"
                                id='userName'
                                name='userName'
                                placeholder='suuuuu'
                            />
                            <ErrorMessage
                                className='form-error'
                                name='userName'
                                component={() => (
                                    <div className='form-error'>{errors.userName}</div>
                                )} />
                        </div>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="name">Correo</label>
                            <Field
                                className="form-input"
                                type="email"
                                id='email'
                                name='email'
                                placeholder='correo@correo.com'
                            />
                            <ErrorMessage name='email'
                                component={() => (
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
                                placeholder='********'
                            />
                            <ErrorMessage name='password'
                                component={() => (
                                    <div className='form-error'>{errors.password}</div>
                                )} />
                        </div>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="repeatPassword">Repetir contraseña</label>
                            <Field
                                className="form-input"
                                type="password"
                                id='repeatPassword'
                                name='repeatPassword'
                                placeholder='********'
                            />
                            <ErrorMessage name='repeatPassword'
                                component={() => (
                                    <div className='form-error'>{errors.repeatPassword}</div>
                                )} />
                        </div>
                        <div className='form-field'>
                            <label className='form-label' htmlFor="birthday">Fecha de nacimiento</label>
                            <Field
                                className="form-input form-input--date"
                                type="date"
                                id='birthday'
                                name='birthday'
                            />
                            <ErrorMessage name='birthday'
                                component={() => (
                                    <div className='form-error'>{errors.birthday}</div>
                                )} />
                        </div>
                        <button className='form-button' type="submit">Registrar</button>
                        {submittedForm && <p className="success-message">Registro exitoso</p>}
                    </Form>
                )}
            </Formik >
        </>
    );
}
