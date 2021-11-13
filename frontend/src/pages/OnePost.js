import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import AuthApi from "../AuthApi";

function OnePost() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let { id } = useParams();
  const [onePostObject, setOnePostObject] = useState({});

  let history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/${id}`, headers)
      .then((response) => {
        console.log(response.data.results[0]);
        setOnePostObject(response.data.results[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const deletePost = (setAuth) => {
    Axios.delete(`http://localhost:3001/posts/${id}`, headers)
    .then((response) => {
      console.log(response);
      history.push("/posts");
    })
  }

  return (
    <AuthApi.Consumer>{({auth, setAuth}) => {
      return (
        <div className="posts__container">
          <h4>Page dédiée pour un seul post</h4>

          <div className="post">
            post id : {onePostObject.id}, <br />
            <img className="post_image" src={onePostObject.image_url} alt=""/> <br />
            publication_date : {onePostObject.publication_date} <br />
            content : {onePostObject.content} <br />
          </div>

          <button onClick={() => deletePost(setAuth)} >Supprimer</button>

        </div>
      )
    }}</AuthApi.Consumer>
  );
}

export default OnePost;
