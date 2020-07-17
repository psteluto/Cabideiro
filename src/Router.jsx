import React from 'react';
import Home from './pages/Home' ;
import About from './pages/About' ;
import Login from './pages/Login' ;
import Catalog from './pages/Catalog' ;
import LoginRegister from './pages/LoginRegister' ;
import Profile from './pages/Profile' ;
import ProductRegister from './pages/ProductRegister' ;
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import {
    BrowserRouter, Route, Switch
} from 'react-router-dom';

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} /> 
                <Route path="/about" exact component={About} />
                <Route path="/login" exact component={Login} />                 
                <Route path="/catalog" exact component={Catalog} />                 
                <Route path="/login/register" exact component={LoginRegister} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/product/register" exact component={ProductRegister} />
                <Route path="/product/:id/details" exact component={Details} />
                <Route path="/product/:id/checkout" exact component={Checkout} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;