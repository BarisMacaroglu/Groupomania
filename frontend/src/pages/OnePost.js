import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function OnePost() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  let { id } = useParams();
  const [onePostObject, setOnePostObject] = useState({});

  useEffect(() => {
    console.log("useEffect sayesinde, sayfa render edilir edilmez çalisti bu:");
    Axios.get(`http://localhost:3001/posts/${id}`, headers)
      .then((response) => {
        console.log(response.data.results[0]);
        setOnePostObject(response.data.results[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="posts__container">
      <h4>Page dédiée pour un seul post</h4>

      <div className="post">
        post id : {onePostObject.id}, <br />
        <img src={onePostObject.image_url} alt=""/> <br />
        publication_date : {onePostObject.publication_date} <br />
        content : {onePostObject.content} <br />
      </div>

    </div>
  );
}

export default OnePost;
