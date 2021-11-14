import React, {useState, useEffect, useContext} from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AuthApi from "./AuthApi";
import Routes from "./Routes";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import "./App.css";
import logo from "./logos/icon-left-font-monochrome-white.svg"

export default function App2() {

  const [auth, setAuth] = useState(null);

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
  if (auth) {

      const userId = localStorage.getItem("userId");

      navLink = <>
              <Nav className="mr-auto">
                  <Link to="/posts" className="nav-link">Tous les posts</Link>
                  <Link to="/users" className="nav-link">Tous les utilisateurs</Link>
                  <Link to={"/users/" + userId } className="nav-link">Mon compte</Link>
              </Nav>
            </>
  } else {
      navLink = <Nav className="mr-auto">
              <Link to="/signup" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
          </Nav>
  }

  console.log(auth);

  return (
    <React.Fragment>
      <AuthApi.Provider value={{ auth, setAuth}}>
        <BrowserRouter>
          <Navbar sticky="top" bg="dark" variant="dark">
              <Link to="/" className="logo-link"> <img className="logo-img" src={logo} alt="logo groupomania"/> </Link>
              {navLink}
          </Navbar>
          <Routes />
        </BrowserRouter>
      </AuthApi.Provider>
    </React.Fragment>
  );
}
