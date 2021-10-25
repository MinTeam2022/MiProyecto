import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import Callback from './components/Callback'


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/callback" component={Callback} />
            <ProtectedRoute path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <Route exact path="/">
              <Redirect exact from="/" to="dashboard" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    </AuthProvider >
  );
}

export default App;
