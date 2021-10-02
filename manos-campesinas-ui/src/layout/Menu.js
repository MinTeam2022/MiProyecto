import '../css/Menu.css'

import { NavLink } from "react-router-dom";


const Menu = (props) => {
    const { match } = props;
    return (
        <ul className="menu_container">
            <li className="menu_item">
                <NavLink activeClassName='menu_is-active' to={`${match.path}/usuarios`} >Usuarios</NavLink>
            </li>
            <li className="menu_item">
                <NavLink activeClassName='menu_is-active' to={`${match.path}/ventas/historial`} >Histiorial de Ventas</NavLink>
            </li>
            <li className="menu_item">
                <NavLink activeClassName='menu_is-active' to={`${match.path}/ventas/registrar`} >Registrar Ventas</NavLink>
            </li>
            <li className="menu_item">
                <NavLink activeClassName='menu_is-active' to={`${match.path}/productos`} >Productos</NavLink>
            </li>
        </ul>
    );
};
export default Menu;
