import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  let history = useHistory();

  const signup = () => {
    console.log("Signup button clicked");
    Axios.post("http://localhost:3001/signup", {
      firstName: firstNameReg,
      lastName: lastNameReg,
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
        // A welcome and 'thank you for joining' message ?
        history.push("/posts");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h3>S'inscrire</h3>
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
        <br/>
        <br/>
        <div>Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link> </div>
        <br /> <br /> <hr />
      </div>
    </div>
  );
}
