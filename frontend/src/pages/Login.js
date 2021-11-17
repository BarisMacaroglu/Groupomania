import React, { useState, useContext } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AuthApi from "../AuthApi";

export default function Login() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  // const [loginStatus, setLoginStatus] = useState("");
  const { setAuth } = useContext(AuthApi);

  let history = useHistory();

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        if (response.data.message) {
          // setLoginStatus(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          console.log("OKAY CONNECTED");
          setAuth({
            userId: response.data.userId,
            isAdmin: response.data.isAdmin,
          });
          history.push("/posts");
        } else {
          alert(response.data.error);
          setAuth({
            userId: 0,
            isAdmin: 0,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        let formError = document.querySelector(".form__error");
        formError.innerHTML = error + " Réessayer s'il vous plait";
      });
  };

  return (
    <section id="login">
      <div className="form__container">
        <div className="header">
          <h2>Se connecter</h2>
        </div>
        <div className="form">
          <div className="form-control">
            <label htmlFor="email">E-mail *</label>
            <input type="email" id="email" name="email" placeholder="Votre adresse e-mail" onChange={(e) => setEmailReg(e.target.value)} required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Mot de passe *</label>
            <input type="password" id="password" name="password" placeholder="Votre mot de passe" onChange={(e) => setPasswordReg(e.target.value)} required />
          </div>
          <button className="auth__btn" onClick={login}>Se connecter</button>
          <div className="form__error"></div>
        </div>
        <h5>Vous n'avez pas de compte ? <Link to="/signup" className="sub_link">Inscrivez-vous ici</Link></h5>
      </div>
    </section>
  );
}
