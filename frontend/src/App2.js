import React, {useState, useEffect} from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AuthApi from "./AuthApi";
import Routes from "./Routes";
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav"; 
import "./App.css";
import logo from "./logos/icon-left-font-monochrome-white.svg"

export default function App2() {

  const [auth, setAuth] = useState({
    userId: 0,
    isAdmin: 0,
  });

  const readLs = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");
    if(token && userId) {
      setAuth({
        userId: userId,
        isAdmin: isAdmin,
      });
    }
  }

  useEffect(() => {
    readLs();
    console.log(auth);
  }, []);

  let navLink;
  if (auth.userId !== 0) {

      const userId = localStorage.getItem("userId");

      navLink = <>
              <Nav>
                  <Link to="/posts" className="nav-link">Posts</Link>
                  <Link to="/users" className="nav-link">Utilisateurs</Link>
                  <Link to={"/users/" + userId } className="nav-link">Mon compte</Link>
              </Nav>
            </>
  } else {
      navLink = <Nav>
              <Link to="/signup" className="nav-link">S'inscrire</Link>
              <Link to="/login" className="nav-link">Se connecter</Link>
          </Nav>
  }

  console.log(auth);

  return (
    <React.Fragment>
      <AuthApi.Provider value={{ auth, setAuth}}>
        <BrowserRouter>
          <Navbar sticky="top" variant="white" className="navbar">
              <Link to="/" className="logo-link"> <img className="logo-img" src={logo} alt="logo groupomania"/> </Link>
              {navLink}
          </Navbar>
          <Routes />
        </BrowserRouter>
      </AuthApi.Provider>
    </React.Fragment>
  );
}
