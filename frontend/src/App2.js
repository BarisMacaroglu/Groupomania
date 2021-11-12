import React, {useState, useEffect, useContext} from "react";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Post from "./pages/Post";
import OnePost from "./pages/OnePost";
import User from "./pages/User";
import Profile from "./pages/Profile";
import AuthApi from "./AuthApi";

export default function App2() {

  const Auth = useContext(AuthApi);

  const [auth, setAuth] = useState(false);

  const readLs = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if(token && userId) {
      setAuth(true);
    }
  }

  useEffect(() => {
    readLs();
    console.log(auth);
  }, []);

  let navbar;
  if(auth === true) {
    const userId = localStorage.getItem("userId");
  }

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
            <Route exact path="/posts"  component ={Post} />
            <Route exact path="/posts/:id"  component ={OnePost} />
            <Route exact path="/users"  component={User}/>
            <Route exact path="/users/:id"  component={Profile}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
