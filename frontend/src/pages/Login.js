import React, { useState, useContext } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AuthApi from "../AuthApi";

export default function Login() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const { setAuth } = useContext(AuthApi);

  let history = useHistory();

  const login = () => {
    console.log("Login button clicked");
    Axios.post("http://localhost:3001/login", {
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          console.log("OKAY CONNECTED");
          setAuth({
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            imageUrl: response.data.imageUrl,
            isAdmin: response.data.isAdmin,
          });
          history.push("/posts");
        } else {
          alert(response.data.error);
          setAuth(null);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section id="login">
      <div class="form__container">
        <div class="header">
          <h2>Se connecter</h2>
        </div>
        <form class="form">
          <div class="form-control">
            <label for="email">E-mail *</label>
            <input type="email" id="email" name="email" placeholder="Votre adresse e-mail" required />
          </div>
          <div class="form-control">
            <label for="password">Mot de passe *</label>
            <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
          </div>
          <button class="auth__btn">Se connecter</button>
          <div class="form__error"></div>
        </form>
      </div>
    </section>
  );

  // return (
  //   <AuthApi.Consumer>
  //     {({ auth, setAuth }) => {
  // return (
  // <div className="login__container">
  //   <h3 className="login__title">Se Connecter</h3>
  //   <div>
  //     <input
  //       type="email"
  //       placeholder="Adresse mail"
  //       onChange={(e) => {
  //         setEmailReg(e.target.value);
  //       }}
  //     ></input>
  //     <input
  //       type="password"
  //       placeholder="Mot de passe"
  //       onChange={(e) => {
  //         setPasswordReg(e.target.value);
  //       }}
  //     ></input>
  //     {/* <button onClick={() => login(setAuth)}>Log in</button> */}
  //     <button onClick={login}>Log innnnn</button>
  //     <h3>{loginStatus}</h3>
  //     <br/>
  //     <br/>
  //     <div>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link> </div>
  //     <br/>
  //     <hr />
  //   </div>
  // </div>);
  //     }}
  //   </AuthApi.Consumer>
  // );
}
