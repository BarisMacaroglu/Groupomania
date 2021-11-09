import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function Profile() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let { id } = useParams();
  const [oneUserObject, setOneUserObject] = useState({});

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/${id}`, headers)
      .then((response) => {
        console.log(response.data);
        setOneUserObject(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="profile__container">
      <h4>Page profile</h4>
      <div className="profile">
        Photo de profile : <img src={oneUserObject.imageUrl} alt="" /> <br />
        Prénom : {oneUserObject.firstName} <br />
        Nom : {oneUserObject.lastName} <br />
        Description : {oneUserObject.description} <br />
        Adresse e-mail : {oneUserObject.email} <br />
        Admin status : {oneUserObject.isAdmin}
      </div>
    </div>
  );
}

export default Profile;
