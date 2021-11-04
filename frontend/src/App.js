import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  // const headers = {
  //   headers : {'Authorization': "Bearer " + localStorage.getItem("tokenApi")}
  // };

  const signup = () => {
    console.log("Signup button clicked");
    Axios.post("http://localhost:3001/signup", {
      firstName: firstNameReg,
      lastName: lastNameReg,
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const login = () => {
    console.log("Login button clicked");
    Axios.post("http://localhost:3001/login", {
      email: emailReg,
      password: passwordReg,
    })
      // .then((response) => console.log(response))
      .then((response) => {
        if(response.data.message) {
            setLoginStatus(response.data.message);
            setToken(response.data.token);
        } else {
            setLoginStatus(response.data[0].name);
        }
    })
      .catch((error) => console.log(error));
      // .catch((error) => setLoginStatus(error));
  };

  const logout = () => {
    console.log("Log out button clicked");
    Axios.get("http://localhost:3001/logout")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const getAllUsers = () => {
    console.log("getAllUsers button clicked");
    Axios.get("http://localhost:3001/users")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div>
        <h3>MVP : Everything on the same page</h3>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        ></input>
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
        <button onClick={signup}>Sign up</button>
        <br /> <br /> <hr />
      </div>
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
        <br/><hr/>
      </div>
      <div>
        <button onClick={logout}>Log Out</button>
        <br/><br/><hr/>
      </div>
      <div>
        <button onClick={getAllUsers}>Affiche tous les utilisateurs</button>
        <br/><br/><hr/>
      </div>
    </div>
  );
}

export default App;
