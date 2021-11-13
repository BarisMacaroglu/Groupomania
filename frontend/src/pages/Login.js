import React, { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import AuthApi from "../AuthApi";

export default function Login() {
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  let history = useHistory();

  const login = (setAuth) => {
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
          console.log('OKAY CONNECTED');
          setAuth({
            username: response.data.lastName,
            id: response.data.userId
          });
        } else {
          alert(response.data.error);
          setAuth(null);
        }
      })
      .catch((error) => console.log(error));
    // .catch((error) => setLoginStatus(error));
  };

  return (
    <AuthApi.Consumer>
      {({ auth, setAuth }) => {
        return (<div>
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
            <button onClick={() => login(setAuth)}>Log in</button>
            <h3>{loginStatus}</h3>
            <h4>{token}</h4>
            <br/>
            <br/>
            <div>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link> </div>
            <br/>
            <hr />
          </div>
        </div>);
      }}
    </AuthApi.Consumer>  
  );
}
