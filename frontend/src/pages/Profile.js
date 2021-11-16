import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import AuthApi from "../AuthApi";
import picDefault from "../logos/anonyme.webp";

function Profile() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let history = useHistory();

  let { id } = useParams();
  const [oneUserObject, setOneUserObject] = useState({});
  // const { auth, setAuth } = useContext(AuthApi);
  const Auth = useContext(AuthApi);
  console.log(Auth.auth);

  console.log(oneUserObject.userId);
  console.log(Auth.auth.userId);

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${id}`, headers)
      .then((response) => {
        console.log(response.data);
        setOneUserObject(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const logout = () => {
    Axios.get("http://localhost:3001/logout", headers)
      .then((response) => {
        console.log(response);
        localStorage.clear();
        history.push("/");
        Auth.setAuth({
          userId: 0,
          isAdmin: 0,
        });
      })
      .catch((error) => console.log(error));
  };

  const confirmDelete = () => {
    // window.alert("Etes-vous sure de supprimer votre compte ?");
    Axios.delete(`http://localhost:3001/users/${id}`, headers)
      .then((response) => {
        console.log(response);
        localStorage.clear();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="profile__container">
      {Auth.auth.userId === oneUserObject.userId ? <h4>Bienvenu {oneUserObject.firstName} !</h4> : <h4>Page profile de {oneUserObject.firstName} {oneUserObject.lastName} </h4> }

      {Auth.auth.isAdmin === 1 && Auth.auth.userId === oneUserObject.userId ?
      <p>Compte Administrateur</p> : <></>}

      <div className="profile">
        <div>
          {oneUserObject.imageUrl ? <img className="profile__photo" src={oneUserObject.imageUrl} alt="" /> : <img className="profile__photo" src={picDefault} alt="" /> }
          {Auth.auth.userId === oneUserObject.userId ? <button>Changer l'image</button> : <></> }
        </div>
        <div>
          {oneUserObject.firstName} {oneUserObject.lastName}
        </div>
        <div>
          <h6>Description :</h6>
          <p>{oneUserObject.description}</p>
          {Auth.auth.userId === oneUserObject.userId ? <button>Changer description</button> : <></> }
        </div>
      </div>

      {Auth.auth.isAdmin === 1 && Auth.auth.userId !== oneUserObject.userId ?
      <div>
        <button className="auth__btn">Bloquer utilisateur</button>
      </div> : <></>}

      {Auth.auth.userId === oneUserObject.userId ? 
        <div className="account">
          <button className="auth__btn" onClick={logout}>Logout</button>
          <button className="auth__btn">Mon compte</button>
          <div className="account__settings">
            <div className="form-control">
              <label htmlFor="password">Ancien mot de passe *</label>
              <input type="password" id="password" name="password" placeholder="Votre mot de passe actuel" required />
            </div>
            <div className="form-control">
              <label htmlFor="password">Nouveau mot de passe *</label>
              <input type="password" id="password" name="password" placeholder="Votre nouveau mot de passe" required />
            </div>
            <button className="auth__btn">Mettre à jour le mot de passe</button>
            <button className="auth__btn" onClick={confirmDelete}>Supprimer le compte</button>
          </div>
        </div> : <></> }
    </div>
  );
}

export default Profile;
