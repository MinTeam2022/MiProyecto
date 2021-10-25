import '../css/Navbar.css'
import loging_button from '../assets/login_button.png'
import { useAuth } from '../context/AuthContext'



const Navbar = (props) => {
    const { signOut } = props
    const { user, profile } = useAuth()
    const userPicture = profile.photos[0].value || loging_button
    return (
        <div className="navbar_container">
            <div className="navbar_title">Manos Campesinas</div>
            <div className="navbar_buttons">
                <div className="navbar_rol">{user.role}</div>
                <img style={{
                    borderRadius: '20px'
                }} src={userPicture} width="32" height="32" alt="" />
                <button className="navbar_logout_button" type="button" onClick={signOut} href="#">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )

}

export default Navbar