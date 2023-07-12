import "../assets/css/User.css";

const User = () => {
  return (
    <>
      <div className="container-fluid mt-5 pt-5">
        <span>Mi Perfil</span>
        <div className="rounded">Imagen</div>
        <div className="user-table d-flex align-items-baseline">
          <i className="ri-user-line"></i>
          <span>Nombre:</span>
          <h3>Matias</h3>
          <span className="bar"></span>
        </div>
        <div className="user-table d-flex align-items-baseline">
          <i className="ri-user-line"></i>
          <span>Apellido:</span>
          <h3>Cuadros</h3>
          <span className="bar"></span>
        </div>
        <div className="user-table d-flex align-items-baseline">
          <i className="ri-mail-line"></i>
          <span>Email:</span>
          <h3>mcuadrose@gmail.com</h3>
          <span className="bar"></span>
        </div>
        <div className="user-table d-flex align-items-baseline">
          <i className="ri-mail-line"></i>
          <span>Usuario desde:</span>
          <h3>10-04-2022</h3>
          <span className="bar"></span>
        </div>
      </div>
    </>
  );
};

export default User;
