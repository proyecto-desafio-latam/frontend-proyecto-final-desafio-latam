import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header
      className="header navbar navbar-expand bg-light border-bottom border-light shadow fixed-top"
      data-scroll-header
    >
      <div className="container-fluid pe-lg-4">
        <div className="d-flex align-items-around w-100">
          <a href="/" className="navbar-brand flex-shrink-0 py-1 py-lg-2">
            <img src="../ejemplo-logo.jpg" width="47" alt="Logo" />
            Libros
          </a>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse5"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="nav dropdown d-block order-lg-3 ms-4">
            <a
              href="#"
              className="d-flex nav-link me-2"
              data-bs-toggle="dropdown"
            >
              <img
                src="../avatar.png"
                alt="Avatar"
                className="rounded-circle"
                width="48"
              />
              <div className="d-none d-sm-block ps-2">
                <div className="fs-xs lh-1 opacity-60">Hola,</div>
                <div className="fs-sm dropdown-toggle">Usuario</div>{" "}
              </div>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end my-1"
              style={{ width: "14rem" }}
            >
              <li>
                <a
                  href="/user/cart"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Carrito
                  </i>

                  <span
                    className="bg-success rounded-circle mt-n2 ms-1"
                    style={{ width: "5px", height: "5px" }}
                  ></span>
                  <span className="ms-auto fs-xs text-muted">2</span>
                </a>
              </li>
              <li>
                <a
                  href="/user"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i
                    className="bx bx-shopping-bag fsbase opacity-60 me-2
                            "
                  >
                    Perfil
                  </i>
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item d-flex align-items-center">
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Mensajes
                  </i>

                  <span
                    className="bg-success rounded-circle mt-n2 ms-1"
                    style={{ width: "5px", height: "5px" }}
                  ></span>
                  <span className="ms-auto fs-xs text-muted">1</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/allcarts"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className=" bx bx-shopping-bag fsbase opacity-60 me-2">
                    Historial de Compras
                  </i>
                  <span className="ms-auto fs-xs text-muted">5</span>
                </a>
              </li>
              <li>
                <a href="#" className="dropdown-item d-flex align-items-center">
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Calificaciones
                  </i>

                  <span className="ms-auto fs-xs text-muted">15</span>
                </a>
              </li>
              <li>
                <a
                  href="/user/favorites"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Favoritos
                  </i>

                  <span className="ms-auto fs-xs text-muted">10</span>
                </a>
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <a href="#" className="dropdown-item d-flex align-items-center">
                  <i className="bx bx-star fs-base opacity-60 me-2"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <nav
            className="collapse navbar-collapse order-lg-2"
            id="navbarCollapse5"
          >
            <hr className="d-lg-none mt-3 mb-2" />
            <ul className="navbar-nav me-auto fs-6">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/books" className="nav-link ">
                  Libros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link ">
                  Ingresar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link ">
                  Registrarse
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link ">
                  Acerca de...
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link ">
                  Contacto
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
