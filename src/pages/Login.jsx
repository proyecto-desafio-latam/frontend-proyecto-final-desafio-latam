export default function Login() {
    return(
        <>
            <div id="container-login">
                <p>email:</p>
                <input type="text" placeholder="email" />
                <br />
                <p>contraseña:</p>
                <input type="text" placeholder="contraseña"/>
                <p>¿Aun no tienes cuenta?</p> 
                <p>Registrate <a href="http://">aquí</a></p>
            </div>
        </>
    )
}