import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
// import { useHistory } from "react-router-dom";

function App() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  // let history = useHistory();

  const headers = {
    headers : {'authorization': "Bearer " + localStorage.getItem("token")}
  };

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
            localStorage.setItem("token", response.data.token);
            // history.push("www.google.com");
        } else {
            alert(response.data.error);
        }
    })
      .catch((error) => console.log(error));
      // .catch((error) => setLoginStatus(error));
  };

  const logout = () => {
    console.log("Log out button clicked");
    Axios.get("http://localhost:3001/logout", headers)
      .then((response) => {
        console.log(response);
        localStorage.clear();
      })
      .catch((error) => console.log(error));
  };

  const getAllUsers = () => {
    console.log("getAllUsers button clicked");
    Axios.get("http://localhost:3001/users", headers)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const getCurrentUser = () => {
    Axios.get("http://localhost:3001/currentuser", headers)
    .then((response) => {
      let userId = response.data.userId;
      console.log(userId);
      return userId;
    })
    .catch((error) => console.log(error));
  }

  const deleteAccount = () => {

      Axios.get("http://localhost:3001/currentuser", headers)
      .then((response) => {
        let userId = response.data.userId;
        console.log(userId);

        Axios.delete(`http://localhost:3001/users/${userId}`, headers)
        .then((response) => {
          console.log(response);
          localStorage.clear();
        })
        .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

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
      <div>
        <button onClick={getCurrentUser}>getCurrentUser</button>
        <br/><br/><hr/>
      </div>
      <div>
        <button onClick={deleteAccount}>Delete the logged user</button>
        <br/><br/><hr/>
      </div>
    </div>
  );
}

export default App;
