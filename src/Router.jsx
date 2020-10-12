import React from 'react';
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';
import Home from './pages/Home' ;
import About from './pages/About' ;
import Login from './pages/Login' ;
import Catalog from './pages/Catalog' ;
import LoginRegister from './pages/LoginRegister' ;
import Profile from './pages/Profile' ;
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import User from './pages/User';
import Success from "./pages/Checkout/Success";

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} /> 
                <Route path="/about" exact component={About} />
                <Route path="/login" exact component={Login} />                 
                <Route path="/catalog/:filter/:value" exact component={Catalog} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/login/register" exact component={LoginRegister} />
                <Route path="/user/:id" exact component={User} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/product/:id/details" exact component={Details} />
                <Route path="/product/:id/checkout" exact component={Checkout} />
                <Route path="/success" exact component={Success} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;