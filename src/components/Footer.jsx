const Footer = () => {
  const openLinks = () => {
    window.open("https://github.com/rigozdev");
    window.open("https://github.com/lilithrv");
    window.open("https://github.com/MattCuadros");
  };

  return (
    <footer class="footer container-fluid bg-dark border-top border-light pt-5 pb-4 pb-lg-5">
      <div class="container pt-lg-4">
        <div class="row pb-5">
          <div class="col-lg-4 col-md-6">
            <div class="navbar-brand text-light p-0 me-0 mb-3 mb-lg-4">
              <img src="../ejemplo-logo.jpg" width="47" alt="Logo" />
              Libros
            </div>
            <p class="fs-sm text-light opacity-70 pb-lg-3 mb-4">
              En nuestra tienda, te ofrecemos una amplia selección de libros de
              diversos géneros y temáticas para satisfacer tus intereses y
              necesidades de lectura. Nuestro objetivo es brindarte una
              experiencia de compra cómoda y accesible desde la comodidad de tu
              hogar.
            </p>
            <form class="needs-validation" novalidate>
              <label for="subscr-email" class="form-label">
                ¡Suscribete para enterarte de lo último!
              </label>
              <div class="input-group">
                <input
                  type="email"
                  id="subscr-email"
                  class="form-control rounded-start ps-5"
                  placeholder="Tu Correo"
                  required
                />
                <i class="bx bx-envelope fs-lg text-muted position-absolute top-50 start-0 translate-middle-y ms-3 zindex-5"></i>
                <div class="invalid-tooltip position-absolute top-100 start-0">
                  Por favor, ingresa un email válido.
                </div>
                <button type="submit" class="btn btn-primary">
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
            <div id="footer-links" class="row">
              <div class="col-lg-4">
                <h6 class="mb-2">
                  <a
                    href="#useful-links"
                    class="d-block text-light dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Links Útiles
                  </a>
                </h6>
                <div
                  id="useful-links"
                  class="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul class="nav flex-column pb-lg-1 mb-lg-3">
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Home
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Libros
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Quienes somos
                      </a>
                    </li>
                  </ul>
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Términos &amp; Condiciones
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Política de Privacidad
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-3">
                <h6 class="mb-2">
                  <a
                    href="#social-links"
                    class="d-block text-light dropdown-toggle d-lg-none py-2"
                    data-bs-toggle="collapse"
                  >
                    Redes Sociales
                  </a>
                </h6>
                <div
                  id="social-links"
                  class="collapse d-lg-block"
                  data-bs-parent="#footer-links"
                >
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Facebook
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Twitter
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link d-inline-block px-0 pt-1 pb-2"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                <h6 class="mb-2 text-light">Contacto</h6>
                <a href="mailto:email@example.com" class="fw-medium">
                  email@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <p class="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
          <span class="text-light opacity-50">
            &copy; All rights reserved. Made by{" "}
          </span>
          <a
            class="nav-link d-inline-block p-0"
            href="https://github.com/proyecto-desafio-latam"
            target="_blank"
            /* rel="noopener" */
            onClick={openLinks}
          >
            DesafioLATAMg26
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
