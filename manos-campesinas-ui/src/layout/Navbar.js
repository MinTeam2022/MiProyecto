import '../css/Navbar.css'
import loging_button from '../assets/login_button.png'



const Navbar = (props) => {
    const {signOut } = props
    const rol = localStorage.getItem('token')
    return (
        <div className="navbar_container">
            <div className="navbar_title">Manos Campesinas</div>
            <div className="navbar_buttons">
                <div className="navbar_rol">{rol}</div>
                <img src={loging_button} width="32" height="32" alt="" />
                <button className="navbar_logout_button" type="button" onClick={signOut} href="#">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )

}

export default Navbar