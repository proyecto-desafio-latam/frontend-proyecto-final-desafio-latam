import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

const Navbar = () => {

  const { user, logout, favorites } = useAuthContext()

  const { cart } = useCartContext();
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });

    return totalQuantity;
  }

  const totalQuantityCart = calculateTotalQuantity();

  return (
    <header
      className="header navbar navbar-expand bg-light border-bottom border-light shadow fixed-top"
      data-scroll-header
    >
      <div className="container-fluid pe-lg-4">
        <div className="d-flex align-items-around w-100">
          <Link to="/" className="navbar-brand flex-shrink-0 py-1 py-lg-2">
            <img src="../ejemplo-logo.jpg" width="47" alt="Logo" />
            Mundo Libros
          </Link>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse5"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {user && <div className="nav dropdown d-block order-lg-3 ms-4">
            <Link
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
                <div className="fs-sm dropdown-toggle">{user.name}</div>{" "}
              </div>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end my-1"
              style={{ width: "14rem" }}
            >

              <li>
                <Link to="/cart" className="dropdown-item d-flex align-items-center">
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">Carrito</i>
                  <span className="bg-success rounded-circle mt-n2 ms-1" style={{ width: "5px", height: "5px" }}></span>
                  <span className="ms-auto fs-xs text-muted">{totalQuantityCart}</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/user"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i
                    className="bx bx-shopping-bag fsbase opacity-60 me-2
                            "
                  >
                    Perfil
                  </i>
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/user/allcarts"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className=" bx bx-shopping-bag fsbase opacity-60 me-2">
                    Historial de Compras
                  </i>
                  <span className="ms-auto fs-xs text-muted">5</span>
                </Link>
              </li> */}
              <li>
                <Link to="/user/addresses" className="dropdown-item d-flex align-items-center">
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Direcciones
                  </i>

                  <span className="ms-auto fs-xs text-muted">15</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/user/favorites"
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bx bx-shopping-bag fsbase opacity-60 me-2">
                    Favoritos
                  </i>

                  <span className="ms-auto fs-xs text-muted">{favorites.length}</span>
                </Link>
              </li>
              <li className="dropdown-divider"></li>
              <li>
                <Link to="#" className="dropdown-item d-flex align-items-center" onClick={logout}>
                  <i className="bx bx-star fs-base opacity-60 me-2"></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>}

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
                {!user && <NavLink to="/login" className="nav-link ">
                  Ingresar
                </NavLink>}
              </li>
              <li className="nav-item">
                {!user && <NavLink to="/register" className="nav-link ">
                  Registrarse
                </NavLink>}
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link ">
                  Sobre nosotros
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