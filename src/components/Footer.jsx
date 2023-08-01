import { Link } from "react-router-dom";

const Footer = () => {
  const openLinks = () => {
    window.open("https://github.com/rigozdev");
    window.open("https://github.com/lilithrv");
    window.open("https://github.com/MattCuadros");
  };

  return (
    <footer className="footer container-fluid bg-dark border-top border-light pt-3 pb-3 pb-lg-4">
      <div className="container pt-lg-4">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="navbar-brand text-light p-0 me-0 mb-3 mb-lg-4">
              <img src="../ejemplo-logo.jpg" width="47" alt="Logo" />
              Mundo Libros
            </div>
            <p className="fs-xs text-light opacity-70 mb-4 justify">
              En nuestra tienda, te ofrecemos una amplia selección de libros de
              diversos géneros y temáticas para satisfacer tus intereses y
              necesidades de lectura. Nuestro objetivo es brindarte una
              experiencia de compra cómoda y accesible desde la comodidad de tu
              hogar.
            </p>
          </div>
          <div className="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
            <div id="footer-links" className="row">
              <div className="col-lg-4">
                <h6 className="mb-2">
                  <Link
                    to={"#useful-links"}
                    className="d-block text-light dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Links Útiles
                  </Link>
                </h6>
                <div
                  id="useful-links"
                  className="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul className="nav flex-column pb-lg-1 mb-lg-3">
                    <li className="nav-item">
                      <Link
                        to={"/"}
                        className="nav-link text-light d-inline-block px-0 py-2"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/books"}
                        className="nav-link text-light d-inline-block px-0 py-2"
                      >
                        Libros
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/about"}
                        className="nav-link text-light d-inline-block px-0 py-2"
                      >
                        Quienes somos
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-3">
                <h6 className="mb-2">
                  <Link
                    to={"#social-links"}
                    className="d-block text-light dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Redes Sociales
                  </Link>
                </h6>
                <div
                  id="social-links"
                  className="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul className="nav flex-column mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        to={"http://www.facebook.com"}
                        className="nav-link  text-light d-inline-block px-0 pt-1 pb-2"
                        target="_blank"
                      >
                        Facebook
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"http://www.linkedin.com"}
                        className="nav-link  text-light d-inline-block px-0 pt-1 pb-2"
                        target="_blank"
                      >
                        LinkedIn
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"http://www.twitter.com"}
                        className="nav-link  text-light d-inline-block px-0 pt-1 pb-2"
                        target="_blank"
                      >
                        Twitter
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"http://www.instagram.com"}
                        className="nav-link text-light d-inline-block px-0 pt-1 pb-2"
                        target="_blank"
                      >
                        Instagram
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
          <span className="text-light opacity-50">
            &copy; All rights reserved. Made by{" "}
          </span>
          <Link
            className="nav-link text-light d-inline-block p-0"
            href="https://github.com/proyecto-desafio-latam"
            target="_blank"
            /* rel="noopener" */
            onClick={openLinks}
          >
            DesafioLATAMg26
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
