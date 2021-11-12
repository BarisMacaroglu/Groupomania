import React, { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  let history = useHistory();

  const login = () => {
    console.log("Login button clicked");
    Axios.post("http://localhost:3001/login", {
      email: emailReg,
      password: passwordReg,
    })
      // .then((response) => console.log(response))
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          history.push("/posts");
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => console.log(error));
    // .catch((error) => setLoginStatus(error));
  };

  return (
    <div>
      <h3>Se Connecter</h3>
      <div>
        <input
          type="email"
          placeholder="Adresse mail"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        ></input>
        <button onClick={login}>Log in</button>
        <h3>{loginStatus}</h3>
        <h4>{token}</h4>
        <br/>
        <br/>
        <div>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link> </div>
        <br/>
        <hr />
      </div>
    </div>
  );
}
