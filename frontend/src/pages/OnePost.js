import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import AuthApi from "../AuthApi";

function OnePost() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let { id } = useParams();
  const [onePostObject, setOnePostObject] = useState({});

  // const { auth, setAuth } = useContext(AuthApi);
  const Auth = useContext(AuthApi);
  console.log(Auth.auth); // Prints the id of the connected user
  // When the page is refreshed, auth is null, so this OnePost page and Profile page gives error as 'auth is null'

  let history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`, headers)
      .then((response) => {
        console.log(response.data.results[0]);
        setOnePostObject(response.data.results[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletePost = () => {
    Axios.delete(`http://localhost:3001/posts/${id}`, headers).then(
      (response) => {
        console.log(response);
        history.push("/posts");
      }
    );
  };

  return (
    <div className="posts__container">
      
      <div className="post">
        <h5 className="post__title">{onePostObject.userFirstName} {onePostObject.userLastName} à {onePostObject.postDate} : </h5>
        <p className="post__text">{onePostObject.postContent}</p>
        <img className="post_image" src={onePostObject.postImage} alt={"Le post de " + onePostObject.userFirstName + " " + onePostObject.userLastName} />
      </div>
      {Auth.auth.isAdmin === 1 || Auth.auth.userId === onePostObject.userId ? <button className="auth__btn" onClick={deletePost}>Supprimer</button> : <></> }

    </div>
  );
}

export default OnePost;
