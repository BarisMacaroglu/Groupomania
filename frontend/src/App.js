import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

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
        <br /> <br /> <hr />
      </div>
    </div>
  );
}

export default App;
