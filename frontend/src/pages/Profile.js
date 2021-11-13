import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import AuthApi from "../AuthApi";

function Profile() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let history = useHistory();

  let { id } = useParams();
  const [oneUserObject, setOneUserObject] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${id}`, headers)
      .then((response) => {
        console.log(response.data);
        setOneUserObject(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const logout = (setAuth) => {
    console.log("Log out button clicked");
    Axios.get("http://localhost:3001/logout", headers)
      .then((response) => {
        console.log(response);
        localStorage.clear();
        setAuth(null);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  const confirmDelete = () => {
    // window.alert("Etes-vous sure de supprimer votre compte ?");
    Axios.delete(`http://localhost:3001/users/${id}`, headers)
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthApi.Consumer>
      {({ auth, setAuth }) => {
        return (
          <div className="profile__container">
            <h4>Page profile</h4>
            <div className="profile">
              Photo de profile : <img src={oneUserObject.imageUrl} alt="" />{" "}
              <br />
              <button>Changer la photo de profile</button> <br />
              Prénom : {oneUserObject.firstName} <br />
              Nom : {oneUserObject.lastName} <br />
              Description : {oneUserObject.description} <br />
              <button>Changer la description</button> <br />
              Adresse e-mail : {oneUserObject.email} <br />
              Admin status : {oneUserObject.isAdmin}
            </div>
            <div className="account__settings">
              <div>
                <label>Ancien MDP</label>
                <input type="password"></input>
                <label>Nouveau MDP</label>
                <input type="password"></input>
                <button>Changer le MDP</button> <br /> <br />
                <button onClick={() => logout(setAuth)}>
                  Logout
                </button> <br /> <br />
              </div>
              <div>
                <button onClick={confirmDelete}>Supprimer le compte</button>
              </div>
            </div>
          </div>
        );
      }}
    </AuthApi.Consumer>
  );
}

export default Profile;
