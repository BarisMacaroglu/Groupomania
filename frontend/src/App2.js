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
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import Routes from "./Routes";

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
  }, [auth]);

  let navLink;
  if (auth === true) {

      const userId = localStorage.getItem("userId");

      navLink = <>
              <Nav className="mr-auto">
                  <Link to="/posts" className="nav-link">Tous les posts</Link>
                  <Link to={"/users/" + userId } className="nav-link">Mon compte</Link>
              </Nav>
            </>
  } else {
      navLink = <Nav className="mr-auto">
              <Link to="/signup" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
          </Nav>
  }

  return (
    <React.Fragment>
      <AuthApi.Provider value={{auth, setAuth}}>
        <BrowserRouter>
          <Navbar sticky="top" bg="dark" variant="dark">
              <Link to="/" className="logo"></Link>
              {navLink}
          </Navbar>
          <Routes />
        </BrowserRouter>
      </AuthApi.Provider>
    </React.Fragment>
  );
}
