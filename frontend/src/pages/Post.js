import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Post() {
  const headers = {
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  };

  const [content, setContent] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:3001/posts", headers)
      .then((response) => {
        console.log(response.data.results);
        setListOfPosts(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageData = document.querySelector("input[type='file']").files[0];
    formData.append("image", imageData);
    formData.append("content", content);

    fetch("http://localhost:3001/posts/new", {
      method: "post",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="posts__container">
      <div className="new_post_form_container">
        <h3>Nouveau post</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="post_imageurl"
            name="imageurl"
            accept=".jpeg,.jpg,.gif"
          ></input>
          <input
            type="text"
            id="post_content"
            name="content"
            placeholder="Dites quelque chose..."
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <button type="submit" className="btn">
            Partager
          </button>
        </form>
      </div>
      <div className="all_posts">
        <h4>Fil d'actualité</h4>
        {listOfPosts.map((value, key) => {
          return (
            <div className="post" key={key} onClick={() => { history.push(`/posts/${value.postId}`); }}>
              <p>{value.userFirstName} {value.userLastName} à {value.postDate} : </p>
              <p className="post__text">{value.postContent} </p>
              <img className="post_image" alt="" src={value.postImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
