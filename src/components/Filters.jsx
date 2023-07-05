const Filters = () => {
    return (
        <div className="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
            <h1 className="me-3">Catálogo de Libros</h1>
            <div className="d-md-flex mb-3">
                <select className="form-select me-md-4 mb-2 mb-md-0" style={{ minWidth: '240px' }}>
                    <option defaultValue disabled>Filtrar por</option>
                    <optgroup label="Categoría">
                        <option value="All">Todas las categorías</option>
                        <option value="Sagas">Sagas</option>
                        <option value="Novela">Novela</option>
                        <option value="Ciencia ficción">Ciencia ficción</option>
                        <option value="Novela psicológica">Novela psicológica</option>
                        <option value="Terror">Terror</option>
                        <option value="Literatura Juvenil">Literatura Juvenil</option>
                        <option value="Clásicos y cuentos">Clásicos y cuentos</option>
                        <option value="Policial">Policial</option>
                        <option value="Literatura latinoamericana">Literatura latinoamericana</option>
                        <option value="Poesía">Poesía</option>
                        <option value="Clásicos">Clásicos</option>
                    </optgroup>
                    <optgroup label="Autor">
                        <option value="J.K. Rowling'">J.K. Rowling'</option>
                        <option value="George R. R. Martin">George R. R. Martin</option>
                        <option value="J.R.R. Tolkien">J.R.R. Tolkien</option>
                        <option value="F. Scott Fitzgerald">F. Scott Fitzgerald</option>
                        <option value="George Orwell">George Orwell</option>
                        <option value="Jane Austen">Jane Austen</option>
                        <option value="Gabriel García Márquez">Gabriel García Márquez</option>
                        <option value="Miguel de Cervantes">Miguel de Cervantes</option>
                        <option value="Fyodor Dostoevsky">Fyodor Dostoevsky</option>
                        <option value="Franz Kafka'">Franz Kafka</option>
                        <option value="Juan Rulfo">Juan Rulfo</option>
                        <option value="Ray Bradbury">Ray Bradbury</option>
                        <option value="Aldous Huxley">Aldous Huxley</option>
                        <option value="Albert Camus">Albert Camus</option>
                        <option value="Stephen King">Stephen King</option>
                        <option value="William Peter Blatty">William Peter Blatty</option>
                        <option value="Bram Stoker">Bram Stoker</option>
                        <option value="Oscar Wilde">Oscar Wilde</option>
                        <option value="John Green">John Green</option>
                        <option value="Rainbow Rowell">Rainbow Rowell</option>
                        <option value="Harper Lee">Harper Lee</option>
                        <option value="Alice Kellen">Alice Kellen</option>
                        <option value="Stephen Chbosky">Stephen Chbosky</option>
                        <option value="Edgar Allan Poe">Edgar Allan Poe</option>
                        <option value="Paula Hawkins">Paula Hawkins</option>
                        <option value="James Ellroy">James Ellroy</option>
                        <option value="Arthur Conan Doyle">Arthur Conan Doyle</option>
                        <option value="Ernesto Sábato">Ernesto Sábato</option>
                        <option value="Ernesto Sábato">Ernesto Sábato</option>
                        <option value="Julio Cortázar">Julio Cortázar</option>
                        <option value="Laura Esquivel">Laura Esquivel</option>
                        <option value="Mario Benedetti">Mario Benedetti</option>
                        <option value="Jorge Luis Borges">Jorge Luis Borges</option>
                        <option value="Alejandra Pizarnik">Alejandra Pizarnik</option>
                        <option value="Gabriela Mistral">Gabriela Mistral</option>
                        <option value="Homero">Homero</option>
                        <option value="Emily Brontë">Emily Brontë</option>
                        <option value="Jonathan Swift">Jonathan Swift</option>
                        <option value="Antoine de Saint-Exupéry">Antoine de Saint-Exupéry</option>
                    </optgroup>
                </select>
                <div className="position-relative" >
                    <select className="form-select me-md-4 mb-2 mb-md-0" style={{ minWidth: '240px' }}>
                        <option defaultValue disabled>Ordenar por</option>
                        <option value="Título">Título: A - Z</option>
                        <option value="Título">Título: Z- A</option>
                        <option value="Autor">Autor: A - Z</option>
                        <option value="Autor">Autor: Z- A</option>
                        <option value="Precio">Precio: Menor a mayor</option>
                        <option value="Precio">Precio: Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filters