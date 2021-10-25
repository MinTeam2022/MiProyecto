import React, { useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useHistory, withRouter } from "react-router";

import "../css/Dashboard.css";

import Menu from "../layout/Menu";
import Navbar from "../layout/Navbar";
import Usuario from "./Usuario";
import Productos from "./Productos";
import VentasHistorial from "./VentasHistorial";
import RegistrarVenta from "./RegistrarVenta";
import { useAuth, useAuthDispatch } from "../context/AuthContext";



const Dashboard = (props) => {
    const history = useHistory()
    const { match } = props;
    const auth = useAuth()
    const authDispatch = useAuthDispatch()
    const signOut = () => {
        authDispatch({
            type: 'deleted'
        })
        history.replace('/login')
    }
    if (!auth) {
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
                        <Route path={`${match.path}/usuarios`} component={Usuario} />
                        <Route path={`${match.path}/ventas/historial`} component={VentasHistorial} />
                        <Route path={`${match.path}/ventas/registrar`} component={RegistrarVenta} />
                        {/* Ventas registro */}
                        <Route exact path={`${match.path}`} component={Productos} />
                    </Switch>

                </main>
            </div>

        </div>
    )
}


export default withRouter(Dashboard);
