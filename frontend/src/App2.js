import React from "react";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// import Post from "./pages/Post";
import "./App.css";
import Post2 from "./pages/Post2";
import OnePost from "./pages/OnePost";
import User from "./pages/User";
import Profile from "./pages/Profile";

export default function App2() {
  return (
    <div>
      <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/signup">S'inscrire</Link>
      <Link to="/login">Se connecter</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/users">Users</Link>
        <Switch>
            <Route exact path="/" component ={Home} />
            <Route exact path="/signup" component ={Signup} />
            <Route exact path="/login" component ={Login} />
            <Route exact path="/posts" component ={Post2} />
            <Route exact path="/posts/:id" component ={OnePost} />
            <Route exact path="/users" component={User}/>
            <Route exact path="/users/:id" component={Profile}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
