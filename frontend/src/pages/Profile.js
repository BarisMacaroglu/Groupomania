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
  const [newDescription, setNewDescription] = useState("");
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

  const changeDescription = () => {
    Axios.put(`http://localhost:3001/users/${id}/description`, {
      description: newDescription,
    }, headers)
    .then((response) => {
      console.log(response);
      history.push(`/users/${id}`);
    }).catch((error) => console.log(error));
  }

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

  const toggleSettings = () => {
    let accountSettings = document.querySelector(".account__settings");
    if(accountSettings.style.display === "none") {
      accountSettings.style.display = "block";
    } else {
      accountSettings.style.display = "none";
    }
  }

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

  const blockUser = () => {
    console.log("User got blocked !");
  }

  return (
    <div className="profile__container">
      {Auth.auth.userId === oneUserObject.userId ? <h4 className="profile_title">Bienvenu {oneUserObject.firstName} !</h4> : <h4 className="profile_title">Page profile de {oneUserObject.firstName} {oneUserObject.lastName} </h4> }

      {Auth.auth.isAdmin === 1 && Auth.auth.userId === oneUserObject.userId ?
      <p className="text-center">Compte Administrateur</p> : <></>}

      <div className="profile">
        <div>
          {oneUserObject.imageUrl ? <img className="profile__photo" src={oneUserObject.imageUrl} alt={"Photo de profile de " + oneUserObject.firstName + " " + oneUserObject.lastName} /> : <img className="profile__photo" src={picDefault} alt="Par default" /> }
          {Auth.auth.userId === oneUserObject.userId ?
          <div className="profile__modify">
            <input type="file" name="profile__picture" accept=".jpeg,.jpg,.gif"></input>
            <button className="btn__modify">Changer l'image</button>
          </div> : <></> }
        </div>
        <div className="identity-container profile-center">
          {oneUserObject.firstName} {oneUserObject.lastName}
        </div>
        <div>
          <h6>Description :</h6>
          <p className="description_text">{oneUserObject.description}</p>
          {Auth.auth.userId === oneUserObject.userId ? 
          <div className="profile__modify">
            <input id="post_content" type="text" placeholder="Modifier votre description ici..." autoComplete="off" onChange={(e) => setNewDescription(e.target.value)}></input>
            <button className="btn__modify" onClick={changeDescription}>Changer description</button>
          </div> : <></> }
        </div>
      </div>

      {Auth.auth.isAdmin === 1 && Auth.auth.userId !== oneUserObject.userId ?
      <div className="admin-settings profile">
        <button className="auth__btn" onClick={blockUser}>Bloquer utilisateur</button>
        <button className="auth__btn">Rendre administrateur</button>
      </div> : <></>}

      {Auth.auth.userId === oneUserObject.userId ? 
        <div className="account profile">
          <button className="auth__btn" onClick={logout}>Logout</button>
          <button className="auth__btn" onClick={toggleSettings}>Mon compte</button>
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
