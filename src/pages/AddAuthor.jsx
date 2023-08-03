import { Field, Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext";

const addAuthor = () => {
    const { token } = useAuthContext();

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}authors`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`Autor ${values.name} agregado con éxito.`)
                resetForm();
            } else {
                toast.warning(`Autor ${values.name} ya existe.`)
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center mt-5 mb-5">Ingresa nuevo autor/a:</h2>
            <Formik
                initialValues={{
                    name: "",
                }}
                validate={(values) => {
                    let validations = {};

                    if (!values.name) {
                        validations.name = "Por favor, ingresa nombre del autor/a";
                    }
                    return validations;
                }}
                onSubmit={handleSubmit}
            >
                {({ errors }) => (
                    <Form className="register-form">
                        <div className="form-field">
                            <label className="form-label" htmlFor="name">
                                Autor
                            </label>
                            <Field
                                className="form-input"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ingresa autor"
                            />
                            <ErrorMessage name="name" component={() => <div className="form-error">{errors.name}</div>} />
                        </div>
                        <div className="login-button-container">
                            <button className="form-button-login" type="submit">
                                Agregar
                            </button>
                        </div>
                        
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default addAuthor;
