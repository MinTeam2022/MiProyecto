import '../css/Login.css'

import { Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login(props) {
    const auth = useAuth()

    const goToLogin = () => {
        let path = "http://localhost:8080/auth/google"
        window.location.href = path
    }
    if (auth) {
        return (
            <Redirect to="/dashboard/productos" />
        )
    }
    return (
        <div className="login_background">
            <div className="login_container">
                <h1 className="login_title">Manos Campesinas</h1>

                <button className="login_button" onClick={goToLogin}>
                    Iniciar sesión con Google
                </button>

            </div>
        </div>
    )
}

export default Login;