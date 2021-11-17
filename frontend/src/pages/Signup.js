import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import AuthApi from "../AuthApi";

function Signup() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const { setAuth } = useContext(AuthApi);

  let history = useHistory();

  const signup = () => {
    Axios.post("http://localhost:3001/signup", {
      firstName: firstNameReg,
      lastName: lastNameReg,
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
        // A welcome and 'thank you for joining' message ?
        Axios.post("http://localhost:3001/login", {
          email: emailReg,
          password: passwordReg,
        })
          .then((response) => {
            if (response.data.message) {
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
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        let formError = document.querySelector(".form__error");
        formError.innerHTML = error + " Réessayer s'il vous plait";
      });
  };
  return (
    <section id="signup">
      <div className="form__container">
        <div className="header">
          <h2>S'inscrire</h2>
        </div>
        <div className="form">
          <div className="form-control">
            <label htmlFor="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Votre prénom"
              onChange={(e) => {
                setFirstNameReg(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Votre nom"
              onChange={(e) => {
                setLastNameReg(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre adresse e-mail"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Mot de passe *</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
              required
            />
          </div>
          <button className="auth__btn" onClick={signup}>
            S'inscrire
          </button>
          <div className="form__error"></div>
        </div>
        <h5>
          Vous avez déjà un compte ? <Link to="/login" className="sub_link">Connectez-vous ici</Link>
        </h5>
      </div>
    </section>
  );
}

export default Signup;
