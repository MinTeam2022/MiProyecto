import '../css/Login.css'

import { useState } from 'react'
import { Redirect } from 'react-router-dom'

function Login(props) {
    const [isLogged, setIsLogged] = useState(false)
    const [loginParams, setLoginParams] = useState({
        user_email: "",
        user_password: ""
    })

    const handleFormChange = event => {
        setLoginParams({
            ...loginParams,
            [event.target.name]: event.target.value
        })
    }
    const login = event => {
        event.preventDefault();
        let user_email = loginParams.user_email;
        let user_password = loginParams.user_password;
        if (user_email === "admin@admin.com" && user_password === "123") {
            localStorage.setItem("token", "admin");
            setIsLogged(true)
        } else if (user_email === "vendedor@vendedor.com" && user_password === "123") {
            localStorage.setItem("token", "vendedor");
            setIsLogged(true)
        }
    };



    if (localStorage.getItem("token")) {
        return <Redirect to="/dashboard/productos" />;
    }
    return (
        <div className="login_background">
            <div className="login_container">
                <h1 className="login_title">Manos Campesinas</h1>
                <form className="login_form" onSubmit={login} autoComplete="off">
                    <input
                        type="email"
                        name="user_email"
                        className="login_input"
                        value={loginParams.user_email}
                        onChange={handleFormChange}
                        placeholder="Correo Electronico"
                        autoComplete="false"
                    />
                    <input
                        type="password"
                        name="user_password"
                        className="login_input"
                        value={loginParams.user_password}
                        onChange={handleFormChange}
                        placeholder="Contraseña"
                        autoComplete="false"
                    />
                    <button type="submit" className="login_button">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;