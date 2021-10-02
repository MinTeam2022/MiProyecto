import React, { useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import "../css/Dashboard.css";

import Menu from "../layout/Menu";
import Navbar from "../layout/Navbar";
import Usuarios from "./Usuarios";
import Productos from "./Productos";
import VentasHistorial from "./VentasHistorial";



const Dashboard = (props) => {
    const { match } = props;
    const [isLogout, setIsLogout] = useState(false)
    const signOut = () => {
        localStorage.removeItem("token");
        setIsLogout(true)
    }
    if (isLogout) {
        return <Redirect to="/login" />
    }
    return (
        <div className="dashboard_container">
            <Navbar signOut={signOut} />
            <div className="dashboard_content">
                <Menu {...props} />
                <main className="dashboard_main">

                    <Switch>
                        <Route path={`${match.path}/productos`} component={Productos} />
                        <Route path={`${match.path}/usuarios`} component={Usuarios} />
                        <Route path={`${match.path}/ventas/historial`} component={VentasHistorial} />
                        {/* Ventas registro */}
                        <Route exact path={`${match.path}`} component={Productos} />
                    </Switch>

                </main>
            </div>

        </div>
    )
}


export default withRouter(Dashboard);
