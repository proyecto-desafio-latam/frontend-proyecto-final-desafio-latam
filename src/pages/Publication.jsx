import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify"
import { useAuthContext } from "../context/AuthContext";
import { useBookContext } from "../context/BookContext";

const Publication = () => {
    const [author, setAuthor] = useState([]);
    const [category, setCategory] = useState([]);
    const { getData } = useBookContext();
    const { token } = useAuthContext();

    const getAuthors = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}authors`);
            if (!response.ok) throw "No se puede desplegar la información";
            const data = await response.json();
            setAuthor(data.result);
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`);
            if (!response.ok) throw "No se puede desplegar la información";
            const data = await response.json();
            setCategory(data.result);
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };
    useEffect(() => {
        getAuthors();
        getCategories();
    }, [])


    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}books`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                getData()
                toast.success(`Libro ${values.title} agregado con éxito.`, {autoClose:2000} )
                resetForm();
            } else {
                getData()
                toast.warning(`Libro no pudo ser agregado, revisa que todos los datos estén completos.`,  {autoClose:3000} )
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };


    return (
        <div className="container pt-5 pb-5">
            <h2 className="text-center pt-5 mt-5 pb-4">Panel para agregar nuevo libro al catálogo</h2>
            <Formik
                initialValues={{
                    title: "",
                    image: "",
                    description: "",
                    price: "",
                    stock: "",
                    category_id: "",
                    author_id: "",
                }}
                validate={(values) => {
                    let validations = {};

                    if (!values.title) {
                        validations.title = "Por favor, ingresa el título del libro";
                    };

                    if (!values.image) {
                        validations.image = "Por favor, ingresa el link de la imagen del libro";
                    };

                    if (!values.description) {
                        validations.description = "Por favor, ingresa una descripción del libro";
                    };

                    if (!values.price) {
                        validations.price = "Por favor, ingresa el precio del libro";
                    } else if (values.price < 0) {
                        validations.price = 'Sólo números enteros positivos';
                    };

                    if (!values.stock) {
                        validations.stock = "Por favor, ingresa el stock del libro";
                    } else if (values.stock < 0) {
                        validations.stock = 'Sólo números enteros positivos';
                    };

                    return validations;
                }}

                onSubmit={handleSubmit}

            >
                {({ errors }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Título
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Ingrese el título del libro"
                            />
                            <ErrorMessage name="title" component={() => <div className="form-error">{errors.title}</div>} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Imagen
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                placeholder="Ingrese el link de la imagen del libro"
                            />
                            <ErrorMessage name="image" component={() => <div className="form-error">{errors.image}</div>} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Descripción
                            </label>
                            <Field as="textarea"
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Ingrese una descripción del libro"
                            />
                            <ErrorMessage name="description" component={() => <div className="form-error">{errors.description}</div>} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Precio
                            </label>
                            <Field
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                placeholder="Ingrese el precio del libro"
                            />
                            <ErrorMessage name="price" component={() => <div className="form-error">{errors.price}</div>} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stock" className="form-label">
                                Stock
                            </label>
                            <Field
                                type="number"
                                className="form-control"
                                id="stock"
                                name="stock"
                                placeholder="Ingrese el stock del libro"
                            />
                            <ErrorMessage name="stock" component={() => <div className="form-error">{errors.stock}</div>} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="category_id">
                                Categoría
                            </label>
                            <Field as="select" className="form-select" id="category_id" name="category_id">
                                <option value="" disabled>Selecciona una categoría</option>
                                {category.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category_id" component={() => <div className="form-error">{errors.category}</div>} />
                            <p className="pt-2">¿No está la categoría que necesitas? Agrégala <Link to="/category">acá</Link></p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="author_id">
                                Autor
                            </label>
                            <Field as="select" className="form-select" id="author_id" name="author_id" >
                                <option value="" disabled>Selecciona un autor</option>
                                {author.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="author_id" component={() => <div className="form-error">{errors.author}</div>} />
                            <p className="pt-2">¿No está el autor que necesitas? Agrégalo <Link to="/author">acá</Link></p>
                        </div>

                        <button type="submit" className="btn btn-outline-primary mt-3">Agregar libro</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Publication;
