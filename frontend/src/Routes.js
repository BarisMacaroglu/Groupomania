import React, {useContext} from 'react';
import {Route, Switch } from 'react-router-dom';

import AuthApi from "./AuthApi";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import OnePost from "./pages/OnePost";
import User from "./pages/User";
import Profile from "./pages/Profile";

function Routes() {

    const Auth = useContext(AuthApi);
    console.log(Auth); // returns an object
    console.log(Auth.auth); // returns true or false

    return (
        <Switch>
            <Route exact path="/" component ={Home} />
            <Route exact path="/signup" component ={Signup} />
            <Route exact path="/login" component ={Login} auth={Auth.auth} />
            <Route exact path="/posts" auth={Auth.auth} component ={Post} />
            <Route exact path="/posts/:id" auth={Auth.auth} component ={OnePost} />
            <Route exact path="/users" auth={Auth.auth} component={User}/>
            <Route exact path="/users/:id" auth={Auth.auth} component={Profile}/>
        </Switch>
    )
}

export default Routes