const ListFav = () => {
  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <h2>Listado de Libros Favoritos:</h2>
        <div className="container-fluid border d-flex ">
          <table className="align-items-between p-3 w-100">
            <thead>
              <th>#</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Año</th>
              <th>Editorial</th>
            </thead>
            <tbody>
                {/* a iterar */}
              <tr>
                <td>1</td>
                <td>La Piedra Filosofal</td>
                <td>J.K Rowling</td>
                <td>Novela</td>
                <td>1990</td>
                <td>Planeta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListFav;
