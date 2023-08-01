import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const User = () => {
  const { user, token } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");

  const editFields = () => {
    setEditMode(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const values = {
        name,
        lastname,
        username,
        password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}user/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEditMode(false);
        setPassword("");
        return data;
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  return (
    <div className="pt-4">
      <h2 className="pt-3 text-center mt-5 pt-5">Mi perfil</h2>
      <div className="container pt-5 w-50 mb-5">
        <div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Nombre
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              Apellido
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                defaultValue={user.email}
                disabled
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="d-flex mt-3 gap-5 justify-content-center">
            <button onClick={editFields} className="btn btn-success">
              Editar
            </button>
            <button onClick={handleUpdateProfile} className="btn btn-info">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
