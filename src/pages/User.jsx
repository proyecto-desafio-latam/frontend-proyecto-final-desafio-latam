import { Avatar } from "@mui/material";
//import "../assets/css/User.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const User = () => {
  return (
    <>
      <div className="container-fluid user-table my-5 p-5">
        <div className=" d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center me-5">
            <Avatar
              alt="Avatar"
              src="/avatar.png"
              sx={{ width: 56, height: 56 }}
            />
            <span className="mt-3 ps-3 display-6 text-center">Mi Perfil</span>
          </div>

          <div className="d-flex mt-5 pt-2">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30vw" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="d-flex flex-column w-50">
                <TextField
                  disabled
                  fullWidth
                  id="outlined-disabled"
                  label="Nombre"
                  defaultValue="Matias"
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Apellido"
                  defaultValue="Cuadros"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Nombre de Usuario"
                  defaultValue="mcuadrose"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Correo"
                  defaultValue="mcuadrose@gmail.com"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="Fecha Nacimiento"
                  defaultValue="04-10-1988"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
