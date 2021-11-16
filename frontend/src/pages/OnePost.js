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
    Axios.delete(`http://localhost:3001/posts/${id}`, headers)
    .then((response) => {
      console.log(response);
      history.push("/posts");
    })
  }

  // return (
  //   <AuthApi.Consumer>{({auth, setAuth}) => {
      return (
        <div className="posts__container">
          <h4>Page dédiée pour un seul post</h4>

          <div className="post">
            post id : {onePostObject.id}, <br />
            <img className="post_image" src={onePostObject.image_url} alt=""/> <br />
            publication_date : {onePostObject.publication_date} <br />
            content : {onePostObject.content} <br />
          </div>

          <button onClick={() => deletePost()} >Supprimer</button>

        </div>
      )
  //   }}</AuthApi.Consumer>
  // );
}

export default OnePost;
