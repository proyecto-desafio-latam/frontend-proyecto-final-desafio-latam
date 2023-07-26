import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const AddCategory = () => {
    const [category, setCategory] = useState();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const { token } = useAuthContext();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                setCategory(data.result);
                setSuccess(true);
                setMessage(`agregada con éxito.`)
                resetForm();
            } else {
                setCategory(values)
                setSuccess(false)
                setMessage(`ya existe.`)
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center mt-5 mb-5">Ingresa nueva categoría:</h2>
            <Formik
                initialValues={{
                    name: "",
                }}
                validate={(values) => {
                    let validations = {};

                    if (!values.name) {
                        validations.name = "Por favor, ingresa nombre de la categoría";
                    }
                    return validations;
                }}
                onSubmit={handleSubmit}
            >
                {({ errors }) => (
                    <Form className="register-form">
                        <div className="form-field">
                            <label className="form-label" htmlFor="name">
                                Categoría
                            </label>
                            <Field
                                className="form-input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ingresa categoría"
                            />
                            <ErrorMessage name="name" component={() => <div className="form-error">{errors.name}</div>} />
                        </div>
                        <div className="login-button-container">
                            <button className="form-button-login" type="submit">
                                Agregar
                            </button>
                        </div>

                        {message &&
                            <div className={(success ? "alert alert-success mt-3" : "alert alert-danger mt-3")}>
                                {`Categoria ${category.name} ${message}`}
                            </div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddCategory;
